import { Col, Container, Row } from "react-bootstrap";
import Card from "../cards/FullCard.tsx";

export default function BestCards() {

    return (
        <>
            <Container>
                <Row>
                    Featured Cards
                </Row>
                <Row>
                    <Col>
                        <Card title={"temp"} width={"8em"} description={"Lorem ipsum"} />
                    </Col>
                    <Col>
                        <Card title={"temp"} width={"8em"} description={"Lorem ipsum"} />
                    </Col>
                    <Col>
                        <Card title={"temp"} width={"8em"} description={"Lorem ipsum"} />
                    </Col>
                    <Col>
                        <Card title={"temp"} width={"8em"} description={"Lorem ipsum"} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}