import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig.ts";
import { useEffect, useState } from "react";
import "./BattleSelector.css"
import { useLocation } from 'react-router-dom';




export default function BattleSelector() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getCards()
    }, []);

    async function getCards() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
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
        });
    }


    return (
        <div className={"d-flex m-5"}>


            <Container fluid>
                <Row>
                    <h1 className="center">
                        Choose 4 cards to battle with
                    </h1>
                </Row>
                <Row>
                    <Col className="col-8 SelectWidget">
                        <Row>
                            <h1 className="center">Deck</h1>
                        </Row>
                        <Row className="BattleSelectorCards">
                            {
                                cards.map((card, index) => (
                                    <PreviewCard
                                        cardName={card.cardAttributes.name}
                                        baseImage={card.baseImage}
                                        frontCard={card.frontCard}
                                        backCard={card.backCard} />
                                ))
                            }
                        </Row>

                        <Row>
                            <Link to={"/BattleMatch"}>
                                <Button variant="primary" size="lg" style={{ float: 'left', width: '100%' }}>
                                    Confirm
                                </Button>
                            </Link>
                        </Row>
                    </Col>
                    <Col className="col-2">
                    </Col>
                    <Col className="col-2">
                        <Row>
                            <p>Test</p>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div >

    )
}
