import { Col, Container, Row } from "react-bootstrap";
import Card from "../components/cards/FullCard.tsx";

export default function Battle() {

    return (
        <div>
            Choose from deck
            <Container>
                <Row className={"m-4"}>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>

                </Row>
                <Row className={"m-4"}>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} width={"10em"} />
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
