import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/Reducer/AppReducer";
import store from "./redux/redux-store";


function App(props) {

    useEffect(() => {
        props.initializeApp()
    }, [props]);


    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/profile/' element={<ProfileContainer/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/login" element={<Login/>}/>


                        {/*<Route path="/news" element={<DialogsContainer/>}/>*/}
                        {/*<Route path="/music" element={<ProfileContainer/>}/>*/}
                        {/*<Route path="/settings" element={<DialogsContainer/>}/>*/}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
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