import ProfileWidget from "../components/widgets/profileWidget/ProfileWidget.tsx";
import BattleWidget from "../components/widgets/battleWidget/BattleWidget.tsx";
import "./Home.css"
import SocialWidget from "../components/widgets/socialWidget/SocialWidget.tsx";
import DeckWidget from "../components/widgets/deckWidget/DeckWidget.tsx";
import Temp from "../components/Temp.tsx";
import { Container, Row, Col } from "react-bootstrap";
import ArenaWidget from "../components/widgets/arenaWidget/ArenaWidget.tsx";

export default function Home() {

    return (
        <div className={"p-2"}>
            <Container>
                <Row className={"m-4"}>
                    <Col md={4}>
                        <ProfileWidget />
                    </Col>
                    <Col md={4}>
                        <DeckWidget />
                    </Col>
                    <Col>
                        <div style={{ marginBottom: "6%", height: "45%" }}>
                            <BattleWidget />
                        </div>
                        <div style={{ height: "45%" }}>
                            <ArenaWidget />
                        </div>
                    </Col>
                </Row>
                <Row className={"m-4"}>
                    <Col md={4}>
                        <SocialWidget />
                    </Col>
                    <Col md={8}>
                        <Temp />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
