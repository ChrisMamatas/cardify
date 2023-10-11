import Card from "../Card.tsx";
import { Container, Row, Col } from "react-bootstrap";

export default function Showcase() {

    return (
            <Container>
                <Row>
                    Showcase
                </Row>
                <Row>
                    <Col className={"m-0 p-0"}>
                        <Card title={"tmp"} description={"Lorem ipsum"} imageUrl={""} buttonText={"button"} width={"8em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} imageUrl={""} buttonText={"button"} width={"8em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} imageUrl={""} buttonText={"button"} width={"8em"} />
                    </Col>
                    <Col>
                        <Card title={"tmp"} description={"Lorem ipsum"} imageUrl={""} buttonText={"button"} width={"8em"} />
                    </Col>
                </Row>
            </Container>
    )
}