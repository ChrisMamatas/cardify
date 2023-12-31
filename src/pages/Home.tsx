import ProfileWidget from "../components/widgets/profileWidget/ProfileWidget.tsx";
import BattleWidget from "../components/widgets/battleWidget/BattleWidget.tsx";
import "./Home.css"
import SocialWidget from "../components/widgets/socialWidget/SocialWidget.tsx";
import DeckWidget from "../components/widgets/deckWidget/DeckWidget.tsx";
import Chat from "../components/Chat.tsx";
import { Container, Row, Col, Stack } from "react-bootstrap";
import ArenaWidget from "../components/widgets/arenaWidget/ArenaWidget.tsx";
import { auth } from "../../firebaseConfig.ts";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import BattleRequestToast from "../components/toasts/BattleRequestToast.tsx";
import Navbar from "react-bootstrap/Navbar";

export default function Home() {

    //const [screenSize, setScreenSize] = useState('');

    // useEffect(() => {
    //     function handleResize() {
    //         if (window.innerWidth >= 3200) {
    //             setScreenSize('xl'); //3440 x 1440
    //         } else if(window.innerWidth >= 2500){
    //             setScreenSize('chris') //2560 x 1664
    //         } else if (window.innerWidth >= 1900) {
    //             setScreenSize('lg'); //1920 x 1080
    //         } else if (window.innerWidth >= 1300) {
    //             setScreenSize('md'); //1536 x 864
    //         } else {
    //             setScreenSize('default'); // Set a default class name if no condition is met
    //         }
    //     }
    //
    //     handleResize();
    //
    //     window.addEventListener('resize', handleResize);
    //
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (

        <div style={{ height: "88vh" }} className={"d-flex m-5 justify-content-between"}>
            <Stack className={"m-2"} style={{width: "16vw"}}>
                <div style={{ height: "36vh", marginBottom: "2vh" }}>
                    <ProfileWidget />
                </div>
                <div style={{ height: "20vh", marginBottom: "2vh" }}>
                    <BattleWidget />
                </div>
                <div style={{ height: "20vh" }}>
                    <ArenaWidget />
                </div>
            </Stack>
            <Stack className={"m-2"} style={{width: "40vw"}}>
                <div style={{ height: "80vh" }}>
                    <DeckWidget />
                </div>
            </Stack>
            <Stack className={"m-2"} style={{width: "10vw"}}>
                <div style={{ height: "48vh", marginBottom: "2vh" }}>
                    <SocialWidget />
                </div>
                <div style={{ height: "30vh" }}>
                    <Chat />
                </div>
            </Stack>
        </div>
    )
}
