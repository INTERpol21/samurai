import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";


 const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs/*" element={<Dialogs state={props.state.dialogsPage}/>}/>
                        <Route path="/profile"
                               element={<Profile state={props.state.profilePage} addPost={props.addPost}/>}/>
                        <Route path="/news" element={<Dialogs state={props.state.dialogsPage}/>}/>
                        <Route path="/music"
                               element={<Profile state={props.state.profilePage} addPost={props.addPost}/>}/>
                        <Route path="/settings" element={<Dialogs state={props.state.dialogsPage}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>

    );
};

export default App;

