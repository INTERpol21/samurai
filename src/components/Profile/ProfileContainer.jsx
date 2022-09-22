import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/Reducer/ProfileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {profileAPI} from "../../api/API";

class ProfileContainer extends React.Component {


    componentDidMount() {

        let userId = this.props.router.params.userId;
        // this.props.userId - наша переданная id из url
        profileAPI.getProfile(userId)
            .then(data => {
                this.props.setUserProfile(data)

            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}


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

//() скобки нужны что бы функция восспринималась как объект со свойством
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})


export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));