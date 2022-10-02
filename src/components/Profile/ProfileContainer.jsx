// import Profile from "./Profile";
// import React from "react";
// import {connect} from "react-redux";
// import {useLocation, useNavigate, useParams} from "react-router-dom";
// import {getStatus, getUserProfile, updateStatus} from "../../redux/Reducer/ProfileReducer";
// import {compose} from "redux";
//
//
// class ProfileContainer extends React.Component {
//
//
//     componentDidMount() {
//
//         let userId = this.props.router.params.userId;
//         if (!userId) {
//             //Мой айди номер с сайта
//             userId = 25994;
//         }
//         //Санки
//         this.props.getUserProfile(userId)
//         this.props.getStatus(userId)
//
//     }
//
//
//     render() {
//
//
//         return (
//             <Profile {...this.props} profile={this.props.profile} status={this.props.status}
//                      updateStatus={this.props.updateStatus}/>
//         )
//     }
// }
//
// //() скобки нужны что бы функция восспринималась как объект со свойством
// let mapStateToProps = (state) => ({
//     profile: state.profilePage.profile,
//     status: state.profilePage.status
// })
//
//
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{location, navigate, params}}
//             />
//         );
//     }
//
//     return ComponentWithRouterProp;
// }
//
//
//
//
// //HOC
// export default compose(
//     connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
//     withRouter,
// )(ProfileContainer);
//

import React from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import Profile from "./Profile";
import {getStatus, getUserProfile, updateStatus} from "../../redux/Reducer/ProfileReducer";
import {connect} from "react-redux";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMyProfile: true
        }
    }


    componentDidMount() {

        let userIdFromPath = +this.props.router.params.userId;
        let authorisedUserId = this.props.authorisedUserId;

        if (userIdFromPath) {

            this.props.getUserProfile(userIdFromPath);
            this.props.getStatus(userIdFromPath);

        } else {

            if (this.props.isAuth && authorisedUserId) {
                this.props.getUserProfile(authorisedUserId);
                this.props.getStatus(authorisedUserId);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let userIdFromPath = +this.props.router.params.userId;
        let authorisedUserId = this.props.authorisedUserId;
        let isShowMyProfile = this.state.isShowMyProfile;

        if (isShowMyProfile) {

            if (userIdFromPath === authorisedUserId) {
                this.setState({isShowMyProfile: false})
            }

            if (!userIdFromPath && this.props.isAuth) {
                this.props.getUserProfile(authorisedUserId);
                this.props.getStatus(authorisedUserId);
                this.setState({isShowMyProfile: false})
            }
        }
    }

    render() {

        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'}/>
        }

        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}


function withRouter(Component) {

    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <Component
            {...props}
            router={{location, navigate, params}}/>;
    }

    return ComponentWithRouterProp;
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})


const ProfileContainerCompose = compose(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})
)(ProfileContainer);

export default ProfileContainerCompose;