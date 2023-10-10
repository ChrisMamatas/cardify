import { Route, Routes, useHref } from 'react-router-dom';
import CardComponent from '../Components/Card';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CreateCard from './CreateCard';

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
    },
    {
        title: "Card 5",
        description: "This is the description for card 5.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "More Info",
    },
    {
        title: "Card 6",
        description: "This is the description for card 6.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Details",
    },
    {
        title: "Card 7",
        description: "This is the description for card 7.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Learn More",
    },
    {
        title: "Card 8",
        description: "This is the description for card 8.",
        imageUrl: "https://via.placeholder.com/150",
        buttonText: "Click Me",
    },
];

export default function Cards() {
    return (
        <><Container style={{ marginTop: "32px" }}>
            <Row md={12}>
                {cardData.map((card, index) => (
                    <Col md={3}>
                        <CardComponent
                            key={index}
                            title={card.title}
                            description={card.description}
                            imageUrl={card.imageUrl}
                            buttonText={card.buttonText}
                            onButtonClick={() => alert(`${card.title} clicked!`)} />
                    </Col>
                ))}
            </Row>
            <Row style={{ marginTop: "32px" }}>
                <Col md={6}>
                    <Button variant="primary" size="lg" style={{ float: 'left', width: '100%' }} href="CreateCard">Create Card

                    </Button>
                </Col>
                <Col md={6} className='justify-content-md-end'>
                    <Button variant="primary" size="lg" style={{ float: 'right', width: '100%' }}>Delete Card</Button>
                </Col>
            </Row>

        </Container>
            <Routes>
                <Route path={"CreateCard"} element={<CreateCard />} />
            </Routes></>
    );
};
