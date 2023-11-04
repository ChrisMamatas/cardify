import { Link, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";

import { auth } from "../../../../firebaseConfig.ts";

import "../../Widgets.css"
import "./DeckWidget.css"
import { Button, Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../../cards/PreviewCard.tsx";


interface CardAttributes {
    name: string;
    colors: {
        dominantHex: string;
        dominantRgb: {
            r: number;
            g: number;
            b: number;
        };
        accentHex: string;
        accentRgb: {
            r: number;
            g: number;
            b: number;
        };
    };
    stats: {
        lightAttack: number;
        heavyAttack: number;
        speed: number;
        defense: number;
    };
}

interface Card {
    baseImage: string;
    frontCard: string;
    backCard: string;
    cardId: string;
    cardAttributes: CardAttributes; // Correct the case to match the response
}
export default function DeckWidget() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        fetch("http://localhost:8080/card", {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
            }
        })
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
                console.log(cards)
            })
            .catch((e) => alert(e))
    }

    return (
        <div className={"Widget center DeckWidget"} >
            <Container className="DeckWidgetContainer">
                <Row md={12}>
                    {
                        cards.map((card, index) => (
                            <Col md={3} key={index}> {/* Added key for list items */}
                                <PreviewCard
                                    cardName={card.cardAttributes.name}
                                    baseImage={card.baseImage}
                                    frontCard={card.frontCard}
                                    backCard={card.backCard} />
                            </Col>
                        ))
                    }
                </Row>

                {/* This row will be pushed to the bottom */}
                <Row style={{ marginTop: "32px" }}>
                    <Col md={6}>
                        <Link to={"/createcard"}>
                            <Button variant="primary" size="lg" style={{ width: '100%' }}>
                                Create Card
                            </Button>
                        </Link>
                    </Col>
                    <Col md={6}>
                        <Button variant="primary" size="lg" style={{ width: '100%' }}>Delete Card</Button>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}