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

import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/Reducer/ProfileReducer";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateGlobalType} from "../../redux/redux-store";


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (formData: ProfileType, setStatus: any,
                  setSubmitting: any, goToViewMode: any) => void
    router: any
    profile: any
}


type PropsType = MapPropsType & DispatchPropsType

type LocalStateType = { isShowMyProfile: boolean }

class ProfileContainer extends React.Component<PropsType, LocalStateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            isShowMyProfile: true
        }
    }


    componentDidMount() {

        let userIdFromPath = +this.props.router.params.userId
        let authorisedUserId = this.props.authorisedUserId

        if (userIdFromPath) {
            //userId = 2;
            //userId = 23275;
            this.props.getUserProfile(userIdFromPath)
            this.props.getStatus(userIdFromPath)

        } else {

            if (this.props.isAuth && authorisedUserId) {
                this.props.getUserProfile(authorisedUserId)
                this.props.getStatus(authorisedUserId)
            }
        }
    }

    componentDidUpdate(prevProps: PropsType & LocalStateType, prevState: PropsType & LocalStateType) {

        let userIdFromPath = +this.props.router.params.userId
        let authorisedUserId = this.props.authorisedUserId
        let isShowMyProfile = this.state.isShowMyProfile

        if (isShowMyProfile) {

            if (userIdFromPath === authorisedUserId) {
                this.setState({isShowMyProfile: false})
            }

            if (!userIdFromPath && this.props.isAuth && authorisedUserId) {
                this.props.getUserProfile(authorisedUserId)
                this.props.getStatus(authorisedUserId)
                this.setState({isShowMyProfile: false})
            }
        }
    }


    render() {

        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'}/>
        }

        let userIdFromPath = +this.props.router.params.userId
        let authorisedUserId = this.props.authorisedUserId


        let isOwner = false
        if (!userIdFromPath && this.props.isAuth) {
            isOwner = true
        } else if (userIdFromPath === authorisedUserId) {
            isOwner = true
        }


        return (
            <div>
                <Profile
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    isOwner={isOwner}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}


// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
function withRouter(Component: any) {

    function ComponentWithRouterProp(props: any) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()

        return <Component
            {...props}
            router={{location, navigate, params}}/>
    }

    return ComponentWithRouterProp
}


let mapStateToProps = (state: AppStateGlobalType) => {


    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}


const ProfileContainerCompose = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer)

export default ProfileContainerCompose
