import React, { useState } from 'react';

import { service } from '../actions/services';
import { Button } from '@material-ui/core';

const ReplaceForm = (props) => {
    const [replaing, setReplacing] = useState(false);
    const [json, setJson] = useState();

    const onClickReplace = () => {
        setReplacing(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onClickSave = () => {
        service.replace(json);
        setReplacing(false);
    }

    const onChange = (e) => {
        let control = document.getElementById("fileInput");
        const reader = new FileReader();
        reader.onload = function (e) {
            let contents = e.target.result;
            setJson(JSON.parse(contents));
        };

        reader.onerror = function (event) {
            console.error("Файл не может быть прочитан! код " + event.target.error.code);
        };

        reader.readAsText(control.files[0]);
    }

    return (
        <>
            {replaing ?
                <form onSubmit={handleSubmit}>
                    <input id="fileInput" type="file" name="Json" accept=".json" onChange={onChange} />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onClickSave}>
                        Save
                    </Button>
                </form>
                : <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onClickReplace}
                    >
                    Replace
                </Button>
            }
        </>)

}

export default ReplaceForm;