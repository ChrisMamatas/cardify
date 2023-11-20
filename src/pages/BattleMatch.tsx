import { Col, Container, Row } from "react-bootstrap";
import { Modal, ModalProps, Button } from 'react-bootstrap';
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./BattleMatch.css"
import {useEffect, useState} from "react";
import {auth} from "../../firebaseConfig.ts";


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
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
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
        })
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
                                setWin(true) ;
                                setLoss(false);
                            }}>
                                Click here to win
                            </Button>
                        </Row>
                        <Row><button style={{height:"5vh", width:"10vw", marginTop:"28vh"}}>Opponent's Turn</button></Row>
                        <Row className="Divider"></Row>
                        <Row><button style={{height:"5vh", width:"10vw", marginBottom:"28vh"}}>My Turn</button></Row>
                        <Row>
                            <Button variant="primary" onClick={() => {
                                setWin(false);
                                setLoss(true);
                            }}>
                                Click to lose
                            </Button>
                        </Row>
                    </Col>
                    <Col  style={{height: "52vh", width: "50vw"}}>
                        <Row style={{justifyContent:"space-between"}}>
                            {
                                cards.slice(0,4).map((card, index) => (
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
                        <Row style={{height:"30vh"}}>
                        </Row>
                        <Row style={{justifyContent:"space-between"}}>
                            {
                                cards.slice(0,4).map((card, index) => (
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