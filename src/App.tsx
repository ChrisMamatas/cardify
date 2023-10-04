import './App.css'
import Navbar from "./navigation/Navbar.tsx";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.tsx";
import Play from "./pages/Play.tsx";
import Friends from "./pages/Friends.tsx";
import Settings from "./pages/Settings.tsx"

function App() {


  return (
      <>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/play"} element={<Play/>} />
          <Route path={"/friends"} element={<Friends/>} />
          <Route path={"/settings"} element={<Settings/>} />
        </Routes>
      </> 
  )
}

export default App
