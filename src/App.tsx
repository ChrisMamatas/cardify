import './App.css'
import Navbar from "./navigation/Navbar.tsx";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx";
import Social from "./pages/Social.tsx";
import Profile from "./pages/Profile.tsx"
import Battle from "./pages/Battle.tsx";
import Arena from "./pages/Arena.tsx";
import Cards from "./pages/Cards.tsx";
import CreateCard from './pages/CreateCard.tsx';

function App() {


    return (
        <div>
            <Navbar />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"/battle"} element={<Battle />} />
                <Route path={"/arena"} element={<Arena />} />
                <Route path={"/cards"} element={<Cards />} />
                <Route path={"/social"} element={<Social />} />

                <Route path={"/createcard"} element={<CreateCard />} />
            </Routes>

        </div>
    )
}

export default App
