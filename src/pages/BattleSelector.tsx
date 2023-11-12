import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig.ts";
import { useEffect, useState } from "react";
import "./BattleSelector.css"
import { useBattle } from "../context/BattleContext.tsx";



export default function BattleSelector() {
    const [cards, setCards] = useState<Card[]>([]);
    const battleContext = useBattle();

    useEffect(() => {
        getCards()
    }, []);

    useEffect(() => {
        console.log('Battle session updated:', battleContext?.battleSession)

    }, [battleContext?.battleSession])

    useEffect(() => {
        const sessionId = battleContext?.battleSession?.id;
        if (sessionId) {

            battleContext?.subscribeToBattleTopic(`${sessionId}`);
        }

        return () => {
            if (sessionId) {

                battleContext?.unsubscribeFromBattleTopic(`${sessionId}`);
            }
        };
    }, []);



    async function getCards() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                fetch("http://localhost:8080/card", {
                    headers: {
                        "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                            {battleContext?.battleSession && (
                                <div>
                                    <p>Session ID: {battleContext?.battleSession?.id}</p>
                                    {battleContext?.battleSession?.players.map((player, index) => (
                                        <p>Player {index + 1}: {player.playerUserName} | Accepted {player.confirmed ? "True" : "False"} </p>
                                    )

                                    )}
                                </div>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div >

    )
}
