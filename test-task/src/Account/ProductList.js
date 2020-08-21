import React from 'react';
import Product from './Product';
import { Table, TableBody, Paper, TableHead, TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const ProductList = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell >{prod.id}</TableCell>

              <TableCell align="right">
                {prod.name}
              </TableCell>
              <TableCell align="right">{prod.status}</TableCell>
              <Product prod={prod} deleteProduct={props.deleteProduct} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
export default withStyles(styles)(ProductList);