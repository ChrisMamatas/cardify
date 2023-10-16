import { Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";

export default function Battle() {

    return (
        <div>
            Choose from deck
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
                    <button style={{ alignSelf: "center" }}>
                        Confirm
                    </button>
                </Row>

            </Container>


        </div>

    )
}
