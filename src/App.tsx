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
import Trading from './pages/Trading.tsx';

function App() {

<<<<<<< HEAD
   return (
      <div>
          <Navbar/>
          <Routes>
              <Route path={"/"} element={<Home/>} />
              <Route path={"/profile"} element={<Profile/>} />
              <Route path={"/battle"} element={<Battle/>} />
              <Route path={"/arena"} element={<Arena/>} />
              <Route path={"/cards"} element={<Cards/>} />
              <Route path={"/social"} element={<Social/>} />
          </Routes>
=======

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
>>>>>>> b7c7cdcde62f9e7867c8e7894390b06ce3f9b0b8

                <Route path={"/createcard"} element={<CreateCard />} />
                <Route path={"/trading"} element={<Trading />} />

            </Routes>

        </div>
    )
}

export default App
