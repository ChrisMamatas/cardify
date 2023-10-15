import { Container, Row, Col, Image } from "react-bootstrap";
import Showcase from "../components/profile/Showcase"
import BestCards from "../components/profile/BestCards.tsx";
import "./Profile.css"
export default function Profile() {

    return (
        <div>
            <Container fluid className={"justify-content-between"}>
                <Row className={"mv-10"}>
                    <Col>
                        <Image src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={200} />

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
                        <Showcase />
                    </Col>
                    <Col>
                        <BestCards />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}