import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ?
            <TextField
                value={title}
                color={'secondary'}
                variant={'standard'}
                onBlur={offEditMode}
                onChange={changeTitle}
                autoFocus
            />
            // ? <input
            //         value={title}
            //         onBlur={offEditMode}
            //         onChange={changeTitle}
            //         autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})
