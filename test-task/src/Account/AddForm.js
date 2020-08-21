import React, { useState } from 'react';

import { validateProduct } from '../actions/validation';
import { Button, TextField, Select } from '@material-ui/core';

const AddForm = (props) => {
    const [adding, setAdding] = useState(false);
    const [err, setErr] = useState();
    const [name, setName] = useState();
    const [status, setStatus] = useState('В наличии');

    const onClickAdd = () => {
        setAdding(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onClickSave = (e) => {
        let newProduct = {
            'id': props.length,
            'name': name,
            'status': status
        }

        if (name && status) {
            if (validateProduct(name) === '') {
                props.addProductInList(newProduct);
                setAdding(false);
            }
            else setErr(validateProduct(name))
        }
        else setErr("Введите название товара")
    }

    return (
        <>
        {adding ?
            <form onSubmit={handleSubmit}>
                {err && <div>{err}</div>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={(e) => { setName(e.target.value) }} />
                <Select fullWidth value = {status} onChange={(e) => { setStatus(e.target.value) }}>
                    <option selected value="В наличии">В наличии</option>
                    <option value="Отсутствует">Отсутствует</option>
                </Select>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onClickSave}>
                    Save
                </Button>
            </form>


            :
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onClickAdd}>
                Add
                </Button>
        }
        </>)

}

export default AddForm;