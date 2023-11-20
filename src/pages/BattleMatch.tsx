import { Col, Container, Row } from "react-bootstrap";
import { Modal, ModalProps, Button } from 'react-bootstrap';
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./BattleMatch.css"
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig.ts";
import { useBattle } from "../context/BattleContext.tsx";


function WinModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">You Win!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="center">+100xp</p>
                <p className="center">+5000 Gold</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button> {/* Add onHide prop here */}
            </Modal.Footer>
        </Modal>
    );
}

function LoseModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">You Lose!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="center">-5000 Gold</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button> {/* Add onHide prop here */}
            </Modal.Footer>
        </Modal>
    );
}

export default function BattleMatch() {
    const [isWin, setWin] = useState(false);
    const [isLoss, setLoss] = useState(false);
    const battleContext = useBattle();
    const [localPlayerCards, setLocalPlayerCards] = useState<Card[]>([]);
    const [opponentPlayerCards, setOpponentPlayerCards] = useState<Card[]>([]);

    useEffect(() => {
        getCards()
    }, [battleContext?.battleSession]);


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

                battleContext?.battleSession?.players.forEach((player) => {
                    if (player.playerId === user.uid) {

                        getPlayerCards(player.selectedCardIds, true);
                    } else {
                        getPlayerCards(player.selectedCardIds, false);
                    }
                });


            }
        })
    }

    async function getPlayerCards(cardIds: string[], isLocalPlayer: boolean) {
        const queryParams = new URLSearchParams();
        cardIds.forEach(id => queryParams.append('ids', id));
        const url = `http://localhost:8080/card?${queryParams.toString()}`;
        fetch(url, {
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
                if (isLocalPlayer) {
                    setLocalPlayerCards(data)
                } else {
                    setOpponentPlayerCards(data)
                }
            })
            .catch((e) => alert(e))
    }

    return (
        <div>
            {isWin && (
                <WinModal show={true} onHide={() => setWin(false)} />
            )}

            {isLoss && (
                <LoseModal show={true} onHide={() => setLoss(false)} />
            )}
            <h1 className="center">
                FIGHT BATTLE
            </h1>

            <Container>
                <Row className="flex-nowrap">
                    <Col md={2}>
                        <Row>
                            <Button variant="primary" onClick={() => {
                                setWin(true);
                                setLoss(false);
                            }}>
                                Click here to win
                            </Button>
                        </Row>
                        <Row><button style={{ height: "5vh", width: "10vw", marginTop: "28vh" }}>Opponent's Turn</button></Row>
                        <Row className="Divider"></Row>
                        <Row><button style={{ height: "5vh", width: "10vw", marginBottom: "28vh" }}>My Turn</button></Row>
                        <Row>
                            <Button variant="primary" onClick={() => {
                                setWin(false);
                                setLoss(true);
                            }}>
                                Click to lose
                            </Button>
                        </Row>
                    </Col>
                    <Col style={{ height: "52vh", width: "50vw" }}>
                        <Row style={{ justifyContent: "space-between" }}>
                            {
                                opponentPlayerCards.map((card, index) => (
                                    <Col md={2} key={index}>
                                        <PreviewCard
                                            cardName={card.cardAttributes.name}
                                            baseImage={card.baseImage}
                                            frontCard={card.frontCard}
                                            backCard={card.backCard} />
                                    </Col>
                                ))
                            }
                        </Row>
                        <Row style={{ height: "30vh" }}>
                        </Row>
                        <Row style={{ justifyContent: "space-between" }}>
                            {
                                localPlayerCards.map((card, index) => (
                                    <Col md={2} key={index}>
                                        <PreviewCard
                                            cardName={card.cardAttributes.name}
                                            baseImage={card.baseImage}
                                            frontCard={card.frontCard}
                                            backCard={card.backCard} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}