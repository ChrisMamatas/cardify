import ProfileWidget from "../components/widgets/profileWidget/ProfileWidget.tsx";
import BattleWidget from "../components/widgets/battleWidget/BattleWidget.tsx";
import "./Home.css"
import SocialWidget from "../components/widgets/socialWidget/SocialWidget.tsx";
import DeckWidget from "../components/widgets/deckWidget/DeckWidget.tsx";
import Chat from "../components/Chat.tsx";
import { Container, Row, Col } from "react-bootstrap";
import ArenaWidget from "../components/widgets/arenaWidget/ArenaWidget.tsx";
import {auth} from "../../firebaseConfig.ts";
import {redirect} from "react-router-dom";

export default function Home() {

    return (
        <div>
            <Container>
                <Row className="flex-nowrap center">
                    <Col>
                        <Row>
                            <div className="xl-2-4 md-2-4 p-2"><ProfileWidget /></div>
                        </Row>
                        <Row>
                            <div className="xl-1-4 md-1-4 p-2"><BattleWidget /></div>
                        </Row>
                        <Row>
                            <div className="xl-1-4 md-1-4 p-2"><ArenaWidget /></div>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <div className="xl-full md-full p-2"><DeckWidget /></div>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <div className="xl-1-4 md-1-4" style={{marginBottom: "2em"}}><SocialWidget /></div>
                        </Row>
                        <Row>
                            <div className="xl-3-4 md-3-4"><Chat /></div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
