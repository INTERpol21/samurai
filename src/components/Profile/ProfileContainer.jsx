import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getStatus, getUserProfile, updateStatus} from "../../redux/Reducer/ProfileReducer";
import {compose} from "redux";


class ProfileContainer extends React.Component {


    componentDidMount() {

        let userId = this.props.router.params.userId;
        if (!userId) {
            //Мой айди номер с сайта
            userId = 25994;
        }
        //Санки
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)

    }


    render() {


        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

//() скобки нужны что бы функция восспринималась как объект со свойством
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}




//HOC
export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer);