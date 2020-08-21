import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { actions } from '../actions/actions';
import { validateUser } from '../actions/validation';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Reg = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState({});

    const { register } = useForm();
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const reg = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };
        setName(name);
        setEmail(email);
        setPassword(password);

        setErr(validateUser(name, email, password));
        if (name && email && password) {
            if (Object.keys(validateUser(name, email, password)).length === 0) {
                props.registerUser(user);
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            {
                props.registered ?
                    <Redirect to={{
                        pathname: '/',
                        state: name
                    }} />
                    :
                    <>
                        <Typography component="h1" variant="h5">
                            Registration
                            <Link to="/login" >Login</Link>
                        </Typography>

                        <form className={classes.form} onSubmit={handleSubmit}>
                            {err['name'] && <div>{err['name']}</div>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            {err['email'] && <div>{err['email']}</div>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            {err['password'] && <div>{err['password']}</div>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            {(name !== '' && email !== '' && password !== '')
                                ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => { reg() }}
                                >Sign In
                            </Button> :
                                <Button
                                    type="submit"
                                    disabled="true"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => { reg() }}
                                >Sign In
                            </Button>}

                        </form>
                        {props.registering &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                alt="loading"
                            />
                        }
                    </>}
        </Container>
    );
}

const mapStateToProps = state => {

    const { registering, registered } = state.authentication;
    return {
        registering,
        registered
    };
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: user => dispatch(actions.register(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reg);