import { useState, useEffect } from "react"
import { Container, Row, Col, Image } from "react-bootstrap";
import Showcase from "../components/profile/Showcase"
import BestCards from "../components/profile/BestCards.tsx";
import "./Profile.css"
import SockJS from "sockjs-client"
import { auth } from "../../firebaseConfig.ts"

// import Stomp from 'stompjs';

export default function Profile() {

    const [message, setMessage] = useState("default test message")
    const [token, setToken] = useState<any>("")

    async function getToken() {
        const idToken = await auth.currentUser?.getIdToken()
        setToken(idToken)

        console.log("token")
        console.log(idToken)
        // Create a new WebSocket connection when the component mounts.
        const sock =  SockJS("http://localhost:8080/ws"); // Replace with your WebSocket server URL.

        sock.onopen = function() {
            console.log('open');
            sock.send('test');
        };

        sock.onmessage = function(e) {
            console.log('message', e.data);
            sock.close();
        };

        sock.onclose = function() {
            console.log('close');
        };
    }

    useEffect(() => {

        getToken()



        // Clean up the WebSocket connection when the component unmounts.
        return () => {
            sock.close();
        };
    }, []); // The empty dependency array ensures this effect runs only once on component mount.


    return (
        <div>
            <Container fluid className={"justify-content-between"}>
                <Row className={"mv-10"}>
                    <Col>
                        <Image
                            src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}
                            height={200}/>
                        <button>Test websocket</button>
                        <input
                            type="text"
                        />
                    </Col>
                    <Col>
                        <div>
                            Game1, game2
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Username
                    </Col>
                    <Col>

                    </Col>
                </Row>

                <Row>
                    <Col>
                        {/*<Showcase/>*/}
                    </Col>
                    <Col>
                        {/*<BestCards/>*/}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}