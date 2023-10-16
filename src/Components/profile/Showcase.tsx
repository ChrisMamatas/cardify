import Card from "../cards/PreviewCard";
import { Container, Row, Col } from "react-bootstrap";

export default function Showcase() {

    return (
        <Container>
            <Row>
                Showcase
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
    )
}