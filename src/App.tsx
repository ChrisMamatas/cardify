import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home.tsx";
import Social from "./pages/Social.tsx";
import Profile from "./pages/Profile.tsx"
import Battle from "./pages/Battle.tsx";
import Arena from "./pages/Arena.tsx";
import Cards from "./pages/Cards.tsx";
import CreateCard from './pages/CreateCard.tsx';
import Trading from './pages/Trading.tsx';
import CustomNavbar from "./navigation/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { AuthProvider } from "./utils/Auth.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";

function App() {

    return (
        <>
            <AuthProvider>
                <CustomNavbar />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />

                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/battle"} element={<Battle />} />
                    <Route path={"/arena"} element={<Arena />} />
                    <Route path={"/cards"} element={<Cards />} />
                    <Route path={"/social"} element={<Social />} />

                    <Route path={"/createcard"} element={<CreateCard />} />
                    <Route path={"/trading"} element={<Trading />} />

                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
