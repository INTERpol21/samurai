import React, {useEffect, useState} from "react"


const ProfileStatusWithHOOK = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let isOwner = props.isOwner
    let textStatusForOwner = ''
    if (isOwner) {
        textStatusForOwner = 'double click here to change'
    }


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    if (!isOwner) {
        return (
            <div>
                <b>Status</b><span>: </span>
                <span>
               {props.status}
            </span>
            </div>)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status</b><span>: </span>
                    <span onDoubleClick={activateEditMode}>
               {props.status || textStatusForOwner}
            </span>
                </div>
            }

            {editMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deActivateEditMode}
                        onChange={onStatusChange}
                        value={status}
                    />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHOOK;


