import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void // родительский callback
}


export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const errorMessage = error && <div className={'error'}>{error}</div>

    const addItem = () => {

        const trimmedTitle = title.trim()

        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title is required !')
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
                variant={'outlined'}
                label={'Title'}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={changeTitle}*/}
            {/*    onKeyPress={onKeyPressAddItem}*/}
            {/*    className={error ? 'input_error' : ''}*/}
            {/*/>*/}
            <IconButton onClick={addItem} color={'secondary'}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
}