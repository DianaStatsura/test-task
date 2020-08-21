import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import AddForm from './AddForm';
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { actions } from '../actions/actions';
import ReplaceForm from './ReplaceForm';
import { Redirect } from 'react-router';
import { service } from '../actions/services';
import { Container, Typography, Button, AppBar, Toolbar, InputBase } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  buttons: {
    margin: 20,
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const Account = (props) => {
  const [name, setName] = useState('user');
  const [products, setProducts] = useState([]);
  const [finded, setFindedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const { classes } = props;

  useEffect(() => {
    service.getProducts().then(res => setProducts(res));
    if (!_.isEmpty(props.user) && props.user !== undefined) {
      setName(props.user.name);
    }
    else setName(props.location.state);
  }, []);

  const addProductInList = (newProduct) => {
    service.addProduct(newProduct).then(res => setProducts([...products, newProduct]))
  }

  const deleteProduct = (id) => {
    let newArr = products.filter(item => item.id !== id);
    setProducts(newArr);
    service.deleteProduct(id);
  }

  const onClickSort = () => {
    setProducts(_.sortBy(products, [(prod) => prod.id]))
  }

  const onChange = (e) => {
    setSearchValue(e.target.value);
    setFindedProducts(_.filter(products, p => p.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  console.log(products);

  return (
    <Container component="main" maxWidth="md">
      {!props.loggingOut ?
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Hello, {name}

              </Typography>
              <div className={classes.button} >
                <Button
                  type="submit"
                  variant="contained"
                  onClick={props.logoutUser}>
                  Logout
              </Button></div>
              <div className={classes.grow} />
              <div className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  onChange={onChange}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.buttons}>
            <ReplaceForm />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickSort}>
              Sort
            </Button>
            {!_.isEmpty(products) ?
              <>
                <AddForm length={products.length + 1} addProductInList={addProductInList} />
                {!searchValue ?
                  <ProductList products={products} deleteProduct={deleteProduct} />
                  :
                  <>{!_.isEmpty(finded) ?
                    <ProductList products={finded} deleteProduct={deleteProduct} />
                    :
                    <div>Ничего не найдено</div>}
                  </>
                }
              </>
              :
              <>
                <AddForm length={1} addProductInList={addProductInList} />
                <div>Список товаров пуст</div>
              </>
            }
          </div>
        </>
        : <Redirect to='/' />}
    </Container>
  );
}

const mapStateToProps = state => {
  //const { products } = state.products;
  const { user, loggingOut } = state.authentication;
  return {
    loggingOut,
    //products,
    user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //getProducts: () => dispatch(actions.getProducts()),
    logoutUser: () => dispatch(actions.logout()),
    //replace: () => dispatch(actions.replace()),
    //addProduct: product => dispatch(actions.addProduct(product))
  };
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Account));
