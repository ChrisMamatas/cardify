import { Button, Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard";

const cardData = [
    {
        title: "Card 1",
        description: "This is the description for card 1.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "More Info",
    },
    {
        title: "Card 2",
        description: "This is the description for card 2.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Details",
    },
    {
        title: "Card 3",
        description: "This is the description for card 3.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Learn More",
    },
    {
        title: "Card 4",
        description: "This is the description for card 4.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Click Me",
    }
];

export default function Trading() {
    return (
        <>

            <Container fluid style={{ marginTop: "32px" }}>
                <Row style={{ flexGrow: "grow" }}>

                    <Col md={4}>
                        <Row md={12}>
                            <h1 style={{ textAlign: "center" }}>My Cards</h1>
                        </Row>
                        <Row md={12}>
                            {cardData.map((card, index) => (
                                <Col md={6}>
                                    <PreviewCard />
                                </Col>
                            ))}
                        </Row>

                    </Col>
                    <Col md="4">
                        <Row md={12} style={{ marginTop: "2em" }}>
                            <h1 style={{ textAlign: "center" }}>Trading</h1>
                        </Row>
                        <Row md={12}>
                            <Col md={6}>
                                <h3 style={{ textAlign: "center" }}>My Card</h3>
                                <PreviewCard />
                            </Col>
                            <Col md={6}>
                                <h3 style={{ textAlign: "center" }}>Friends Card</h3>

                                <PreviewCard />
                            </Col>
                        </Row>
                        <Row md={12} style={{ marginTop: "2em" }}>
                            <Button variant="primary" size="lg" style={{ float: 'left', width: '100%' }}>Trade

                            </Button>
                        </Row>
                        <Row md={12} style={{ marginTop: "2em" }} >
                            <Button variant="primary" size="lg" style={{ float: 'right', width: '100%' }}>Cancel</Button>
                        </Row>

                    </Col>
                    <Col md="4">
                        <Row md={12}>
                            <h1 style={{ textAlign: "center" }}>Friends Cards</h1>
                        </Row>
                        <Row md={12}>
                            {cardData.map((card, index) => (
                                <Col md={6}>
                                    <PreviewCard />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

        </>
    );
};
