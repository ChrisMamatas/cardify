import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PreviewCard from '../components/cards/PreviewCard';
import { auth } from "../../firebaseConfig.ts";
import dotenv from "dotenv"
import path from "path"

// const cardData = [
//     {
//         title: "Card 1",
//         description: "This is the description for card 1.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "More Info",
//     },
//     {
//         title: "Card 2",
//         description: "This is the description for card 2.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Details",
//     },
//     {
//         title: "Card 3",
//         description: "This is the description for card 3.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Learn More",
//     },
//     {
//         title: "Card 4",
//         description: "This is the description for card 4.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Click Me",
//     },
//     {
//         title: "Card 5",
//         description: "This is the description for card 5.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "More Info",
//     },
//     {
//         title: "Card 6",
//         description: "This is the description for card 6.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Details",
//     },
//     {
//         title: "Card 7",
//         description: "This is the description for card 7.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Learn More",
//     },
//     {
//         title: "Card 8",
//         description: "This is the description for card 8.",
//         imageUrl: "https://via.placeholder.com/150",
//         buttonText: "Click Me",
//     },
// ];

export default function Cards() {

    const [cards, setCards] = useState([])

    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        fetch("http://localhost:8080/card")
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error()
            }
        })
        .then((data) => {
            console.log("data")
            console.log(data)
            setCards(data)
        })
        .catch((e) => alert(e))
    }

    return (
        <>

            <Container style={{ marginTop: "32px" }}>
                <Row md={12}>
                    {/*{cardData.map((card, index) => (*/}
                    {/*    <Col md={3}>*/}
                    {/*        <PreviewCard />*/}
                    {/*    </Col>*/}
                    {/*))}*/}
                    {
                        cards.map((card, index) => (
                            <Col md={3}>
                                <PreviewCard imageUrl={"data:image/png;base64," + card.image}/>
                            </Col>
                        ))
                    }
                </Row>
                <Row style={{ marginTop: "32px" }}>
                    <Col md={6}>
                        <Link to={"/createcard"}>
                            <Button variant="primary" size="lg" style={{ float: 'left', width: '100%' }}>
                                Create Card
                            </Button>
                        </Link>
                    </Col>
                    <Col md={6} className='justify-content-md-end'>
                        <Button variant="primary" size="lg" style={{ float: 'right', width: '100%' }}>Delete Card</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
