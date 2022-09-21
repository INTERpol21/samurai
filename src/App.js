import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App = () => {

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


                        {/*<Route path="/news" element={<DialogsContainer/>}/>*/}
                        {/*<Route path="/music" element={<ProfileContainer/>}/>*/}
                        {/*<Route path="/settings" element={<DialogsContainer/>}/>*/}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;

