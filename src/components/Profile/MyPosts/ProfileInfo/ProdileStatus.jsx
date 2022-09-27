import React from "react"


class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }
//Создания метода, в функциональных создаем функцию обработчик
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })

    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true}
                               onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

// import React, {useEffect, useState} from 'react';
//
// const ProfileStatus = (props) => {
//
//     useEffect(() => {
//         setStatus(props.status)
//     }, [props.status]);
//
//     const [editMode, setEditMode] = useState(false);
//     const [status, setStatus] = useState(props.status);
//
//     const deactivateEditMode = () => {
//         setEditMode(false);
//         props.updateStatus(status);
//     }
//
//     const onStatusChange = (e) => {
//         setStatus(e.currentTarget.value);
//     }
//
//     return (
//         <div>
//             { editMode === false
//                 ?   <div>
//                     <span style={{fontStyle: "italic" }} onDoubleClick={() =>{setEditMode(true)} } > {props.status || "no status yet"}</span>
//                 </div>
//
//                 :   <div>
//                     <input autoFocus={ true } onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
//                 </div>
//             }
//         </div>
//     );
// };

export default ProfileStatus;


