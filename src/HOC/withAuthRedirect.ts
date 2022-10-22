import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateGlobalType} from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateGlobalType) => {
    return {
        isAuth: state.auth.isAuth
    } // as MapPropsType // работает и без этого
}

type MapPropsType = { isAuth: boolean }

type DispatchPropsType = {}

// WCP это - WrappedComponentProps

export function withAuthRedirect<WCP>(
    WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType &
        DispatchPropsType> = (props) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) {

            return <Navigate to = {'/login'}
            />
        }

        return <WrappedComponent {...restProps as WCP}
        />
    }

    return connect<MapPropsType, DispatchPropsType,
        WCP, AppStateGlobalType>(
        mapStateToPropsForRedirect, {})(RedirectComponent)
}