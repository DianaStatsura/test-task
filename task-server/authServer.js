require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.json(), cors());

const admin = require("firebase-admin");

const serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-task-30da4.firebaseio.com"
});

const db = admin.firestore();

let refreshTokens = [];

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/signup', (req, res) => {
    let user = { name: req.body.name, email: req.body.email, password: req.body.password }
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '5m' })
    refreshTokens.push(refreshToken);
    try {
        db.collection('users').add(user).then(() => {
            res.status(201).send({ user, accessToken: accessToken, refreshToken: refreshToken })
        });
    } catch (error) {
        res.status(400).send(`User haven't been added`)
    }
})

app.post('/login', (req, res) => {
    const accessToken = generateAccessToken({ email: req.body.email, password: req.body.password });
    console.log(accessToken);

    try {
        db.collection('users').get().then((result) => {
            let user = {};
            result.forEach(
                (doc) => {
                    if (doc.data().email === req.body.email && doc.data().password === req.body.password) {
                        console.log(doc.id, '=>', doc.data())
                        user = doc.data();
                    }
                }
            )
            console.log("USER", user);
            res.status(200).send({ user, accessToken: accessToken });
        })

    } catch (error) {
        res.status(500).send(error);
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '5m' })
}

app.listen(8888, () =>
    console.log('Example app listening on port 8888!'),
);