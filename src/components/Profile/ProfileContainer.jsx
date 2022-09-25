import Profile from "./Profile";
import React from "react";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getUserProfile} from "../../redux/Reducer/ProfileReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";


class ProfileContainer extends React.Component {


    componentDidMount() {

        let userId = this.props.router.params.userId;
        //Санки
        this.props.getUserProfile(userId)

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

//HOC
let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


//() скобки нужны что бы функция восспринималась как объект со свойством
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent));