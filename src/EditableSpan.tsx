import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type EditableSpan = {
    title: string
    changeItem: (title: string) => void
}

function EditableSpan(props: EditableSpan) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    function onEditMOde() {
        setEditMode(true)
    }

    function offEditMOde() {
        setEditMode(false)
        props.changeItem(title)
    }

    const onChangeHandlerSpan = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (

        editMode ? <TextField
                variant="filled"
                value={title}
                             autoFocus
                             onBlur={offEditMOde}
                             onChange={onChangeHandlerSpan}/> :
            <span onDoubleClick={onEditMOde}>{props.title}</span>
    );
};

export default EditableSpan;