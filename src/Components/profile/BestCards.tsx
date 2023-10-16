import { Col, Container, Row } from "react-bootstrap";
import Card from "../cards/PreviewCard.tsx";

export default function BestCards() {

    return (
        <>
            <Container>
                <Row>
                    Featured Cards
                </Row>
                <Row>
                    <Col>
                        <Card />
                    </Col>
                    <Col>
                        <Card />
                    </Col>
                    <Col>
                        <Card />
                    </Col>
                    <Col>
                        <Card />
                    </Col>
                </Row>
            </Container>
        </>
    )
}