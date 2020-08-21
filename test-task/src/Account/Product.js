import React from 'react';

import { Button } from '@material-ui/core';

const Product = (props) => {

    const onClick = (e) => {
        console.log(e.currentTarget.value)
        props.deleteProduct(props.prod.id);
    }

    return (
        <>
            <Button
                type="submit"
                variant="contained"
                color="primary" onClick={onClick}>
                Delete
            </Button>
        </>
    )

}

export default Product;

