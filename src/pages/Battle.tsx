import { Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import {Link} from "react-router-dom";

export default function Battle() {

    return (
        <div>
            <h1 className="center">
                Choose 4 cards to battle with
            </h1>

            <Container>
                <Row className={"m-4"}>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>

                </Row>
                <Row className={"m-4"}>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>
                    <Col>
                        <PreviewCard />
                    </Col>
                </Row>

                <Row>
                    <Link to={"/BattleMatch"}>
                    <button variant ="primary" size="lg" style={{ float: 'left', width: '100%' }}>
                        Confirm
                    </button>
                    </Link>
                </Row>
            </Container>
        </div>

    )
}
