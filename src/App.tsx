import {useEffect} from "react";
import './App.css'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import Home from "./pages/Home.tsx";
import Social from "./pages/Social.tsx";
import Profile from "./pages/Profile.tsx"
import Battle from "./pages/Battle.tsx";
import ArenaSelector from "./pages/ArenaSelector.tsx";
import ArenaMatch from "./pages/ArenaMatch.tsx"
import Cards from "./pages/Cards.tsx";
import CreateCard from './pages/CreateCard.tsx';
import Trading from './pages/Trading.tsx';
import CustomNavbar from "./navigation/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ArenaDrafter from "./pages/ArenaDrafter.tsx";
import {auth} from "../firebaseConfig.ts"
import BattleMatch from "./pages/BattleMatch.tsx";
import UpdateInfo from "./pages/UpdateInfo.tsx";
import UpdateProfile from "./pages/UpdateProfile.tsx";

function App() {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // if (!auth.currentUser && (location.pathname !== "/login" && location.pathname !== "/register")) {
        //     navigate("/login")
        // }
        console.log("auth")
        console.log(auth)
        console.log("end auth")
    }, []);


    return (
        <>
            {
                location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/update" && <CustomNavbar />
            }
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/update"} element={<UpdateProfile />} />

                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/updateInfo"} element={<UpdateInfo />} />
                <Route path={"/battle"} element={<Battle />} />
                <Route path={"/battleMatch"} element={<BattleMatch />} />
                <Route path={"/arenaMatch"} element={<ArenaMatch />} />
                <Route path={"/arenaSelector"} element={<ArenaSelector />} />
                <Route path={"/cards"} element={<Cards />} />
                <Route path={"/social"} element={<Social />} />
                <Route path={"/ArenaDrafter"} element={<ArenaDrafter/>}/>
                <Route path={"/createcard"} element={<CreateCard />} />
                <Route path={"/trading"} element={<Trading />} />

            </Routes>
        </>
    )
}

export default App
