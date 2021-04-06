import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? 'input_error' : ''}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}