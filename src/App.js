import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";


export const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/dialogs/*" element={<Dialogs/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/news" element={<Dialogs/>}/>
                        <Route path="/music" element={<Profile/>}/>
                        <Route path="/settings" element={<Dialogs/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>

    );
};

export default App;

