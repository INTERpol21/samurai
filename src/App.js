import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {lazy, Suspense, useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/Reducer/AppReducer";
import store from "./redux/redux-store";
import Preloader from "./components/UX/Preloader/Preloader";


const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));

function App(props) {

    useEffect(() => {
        props.initializeApp()
    }, [props]);


    return (

        <HashRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>

                            <Route exact path="/dialogs" element={<DialogsContainer/>}/>

                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile/' element={<ProfileContainer/>}/>
                            <Route path="/users" element={<UsersContainer/>}/>
                            <Route path="/login" element={<Login/>}/>


                            {/*<Route path="/news" element={<DialogsContainer/>}/>*/}
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

let MainApp = (props) => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}

export default MainApp