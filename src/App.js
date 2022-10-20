import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {lazy, Suspense, useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/Reducer/AppReducer";
import store from "./redux/redux-store";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import Preloader from "./utils/Preloader/Preloader";


const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));

function App(props) {

    useEffect(() => {
        props.initializeApp()
    }, [props]);

    // if (!props.initialized) {
    //     return <Preloader />
    // }


    return (

        <HashRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile"/>}/>
                            <Route exact path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile/*' element={<ProfileContainer/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path='*' element={<NotFound/>}/>
                            {/*<Route path="/music" element={<ProfileContainer/>}/>*/}
                            {/*<Route path="/settings" element={<DialogsContainer/>}/>*/}
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </HashRouter>
    );
}


// export default connect(null, {getAuthUserData, logout})(App);
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


const AppContainer = connect(mapStateToProps, {initializeApp})(App);

let MainApp = () => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}

export default MainApp