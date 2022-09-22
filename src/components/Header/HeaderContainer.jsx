import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/Reducer/AuthReducer";


class HeaderContainer extends React.Component {

    componentDidMount() {

        axios.defaults.withCredentials = true;
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    //Деструкуризация. Быть острожным с передачей и очередью setAuthUserData
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header{...this.props}/>
        )

    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);