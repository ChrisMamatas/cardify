import './App.css'
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home.tsx";
import Social from "./pages/Social.tsx";
import Profile from "./pages/Profile.tsx"
import Battle from "./pages/BattleSelector.tsx";
import ArenaSelector from "./pages/ArenaSelector.tsx";
import ArenaMatch from "./pages/ArenaMatch.tsx"
import Trading from './pages/Trading.tsx';
import CustomNavbar from "./navigation/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ArenaDrafter from "./pages/ArenaDrafter.tsx";
import BattleMatch from "./pages/BattleMatch.tsx";
import UpdateInfo from "./pages/UpdateInfo.tsx";
import UpdateProfile from "./pages/UpdateProfile.tsx";
import PostRegister from "./pages/PostRegister.tsx";
import { ToastProvider } from './context/ToastContext.tsx';
import BattleSelector from './pages/BattleSelector.tsx';
import { BattleProvider } from './context/BattleContext.tsx';
import { WebSocketProvider } from './context/WebSocketContext.tsx';

function App() {

    const location = useLocation()

    return (
        <>
            {
                location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/postregister" && location.pathname !== "/update" && <CustomNavbar />
            }
            <WebSocketProvider>
                <ToastProvider>
                    <BattleProvider>
                        <Routes>
                            <Route path={"/"} element={<Home />} />
                            <Route path={"/login"} element={<Login />} />
                            <Route path={"/register"} element={<Register />} />
                            <Route path={"/update"} element={<UpdateProfile />} />
                            <Route path={"/postregister"} element={<PostRegister />} />
                            <Route path={"/BattleSelector"} element={<BattleSelector />} />
                            <Route path={"/profile"} element={<Profile />} />
                            <Route path={"/updateInfo"} element={<UpdateInfo />} />
                            <Route path={"/battle"} element={<Battle />} />
                            <Route path={"/battleMatch"} element={<BattleMatch />} />
                            <Route path={"/arenaMatch"} element={<ArenaMatch />} />
                            <Route path={"/arenaSelector"} element={<ArenaSelector />} />
                            <Route path={"/social"} element={<Social />} />
                            <Route path={"/ArenaDrafter"} element={<ArenaDrafter />} />
                            <Route path={"/trading"} element={<Trading />} />
                        </Routes>
                    </BattleProvider>
                </ToastProvider>
            </WebSocketProvider>
        </>
    )
}

export default App
