import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import '../Reg/Reg.css';

import { useForm } from "react-hook-form";
import { actions } from '../actions/actions';
import { Typography, TextField, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const { register } = useForm();
  const classes = useStyles();

  const handleSubmit = (e) => {
    console.log(props.user);
    e.preventDefault();
  }

  const login = () => {
    const user = {
      email: email,
      password: password
    };
    setEmail(email);
    setPassword(password);

    if (email && password) {
      props.loginUser(user);
      if (!props.user || _.isEmpty(props.user))
        setErr("Неверные email и/или пароль")

    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {
        props.loggedIn && !_.isEmpty(props.user) ?
          <Redirect to={{
            pathname: '/',
            state: props.user.name
          }}
          />
          :
          <>
            <Typography component="h1" variant="h5">
              Login
            <Link to="/register" >Registration</Link>
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              {err && <div>{err}</div>}
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
              {(email !== '' && password !== '')
                ?
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => { login() }}
                >Login
                            </Button> :
                <Button
                  type="submit"
                  disabled="true"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => { login() }}
                >Login
                            </Button>}
            </form>
            {props.loggingIn && (
              <img
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                alt="loading"
              />
            )}
          </>
      }
    </Container>
  );
}

const mapStateToProps = state => {
  const { loggedIn, loggingIn, user } = state.authentication;
  return {
    loggedIn,
    loggingIn,
    user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(actions.login(user)),
    logoutUser: () => dispatch(actions.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
