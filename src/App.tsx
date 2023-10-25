import React, {useEffect, useState} from "react";
import './App.css'
import {Route, Routes, redirect, useLocation, useNavigate, useNavigation} from "react-router-dom"
import Home from "./pages/Home.tsx";
import Social from "./pages/Social.tsx";
import Profile from "./pages/Profile.tsx"
import Battle from "./pages/Battle.tsx";
import ArenaSelector from "./pages/ArenaSelector.tsx";
import Cards from "./pages/Cards.tsx";
import CreateCard from './pages/CreateCard.tsx';
import Trading from './pages/Trading.tsx';
import CustomNavbar from "./navigation/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import {AuthContext, AuthProvider} from "./utils/Auth.tsx";
import React from "react";
import ArenaDrafter from "./pages/ArenaDrafter.tsx";
import {auth} from "../firebaseConfig.ts"
// import PrivateRoute from "./utils/PrivateRoute.tsx";

function App() {

    const location = useLocation()
    const navigate = useNavigate()

    // console.log(location)

    useEffect(() => {
        if (!auth.currentUser && (location.pathname !== "/login" && location.pathname !== "/register")) {
            console.log("should rediret, app.tsx")
            navigate("/login")
        }
        else {
            console.log(auth.currentUser)
        }
    }, []);


    return (
        <>
            <AuthProvider>
                {
                    location.pathname !== "/login" && location.pathname !== "/register" &&  <CustomNavbar />
                }
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />

                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/battle"} element={<Battle />} />
                    <Route path={"/arenaSelector"} element={<ArenaSelector />} />
                    <Route path={"/cards"} element={<Cards />} />
                    <Route path={"/social"} element={<Social />} />
                    <Route path={"/ArenaDrafter"} element={<ArenaDrafter/>}/>
                    <Route path={"/createcard"} element={<CreateCard />} />
                    <Route path={"/trading"} element={<Trading />} />

                </Routes>
            </AuthProvider>
        </>
    )
}

export default App
