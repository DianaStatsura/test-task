const products = require('./products.json');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

app.use(express.json());

app.post('/products', (req, res) => {
    fs.readFile('./products.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile('./products.json', JSON.stringify(req.body), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been replaced");
            })
        }
    });
    res.json(products);
})

app.get('/products', (req, res) => {
    res.json(products);
})

app.delete('/product/:id', (req, res) => {
    fs.readFile('./products.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let newProducts = products.products;
            let newArr = _.remove(newProducts, p => p.id.toString() !== req.params.id);
            let newJSON = JSON.stringify({ products: newArr });
            fs.writeFile('./products.json', newJSON, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been deleted");
            })
        }
    });
    res.json(products);
})

app.post('/product', (req, res) => {
    fs.readFile('./products.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let newProducts = products.products;
            newProducts.push(req.body);
            let newJSON = JSON.stringify({ products: newProducts });
            fs.writeFile('./products.json', newJSON, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("File has been added");
            })
        }
    });
    res.json(products);
})

app.listen(8080, () =>
    console.log('Example app listening on port 8080!'),
);