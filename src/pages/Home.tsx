import ProfileWidget from "../components/ProfileWidget.tsx";
import PlayWidget from "../components/PlayWidget.tsx";
import "./Home.css"
import SocialWidget from "../components/SocialWidget.tsx";
import DeckWidget from "../components/DeckWidget.tsx";
import Temp from "../components/Temp.tsx";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {

    return (
        <div className={"m-4"}>
            <Container>
                <Row className={"m-4"}>
                    <Col md={4}>
                        <ProfileWidget />
                    </Col>
                    <Col md={4}>
                        <DeckWidget />
                    </Col>
                    <Col md={4}>
                        <PlayWidget />
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
