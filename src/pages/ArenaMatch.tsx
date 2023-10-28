import { Col, Container, Row } from "react-bootstrap";
import { Modal, ModalProps, Button } from 'react-bootstrap';
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./ArenaMatch.css"
import { useState } from "react";

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

    return (
        <div>
            {isWin && (
                <WinModal show={true} onHide={() => setWin(false)} />
            )}

            {isLoss && (
                <LoseModal show={true} onHide={() => setLoss(false)} />
            )}

            <h1 className="center">
                FIGHT ARENA
            </h1>
            <div className="center">
                <Container>
                    <Row>
                        <Col className="center"><PreviewCard height="100px"/></Col> <Col/> <Col/> <Col/>
                    </Row>

                    <Row>
                        <Col className="Divider"/> <Col className="center"><PreviewCard height="100px"/></Col> <Col/> <Col/>
                    </Row>

                    <Row>
                        <Col className="center"><PreviewCard height="100px"/></Col> <Col className="Divider"/> <Col className="center"><PreviewCard height="100px"/></Col> <Col/>
                    </Row>

                    <Row>
                        <Col/> <Col className="center"><PreviewCard height="100px"/></Col> <Col className="Divider"/> <Col className="center"><PreviewCard height="100px"/></Col>
                    </Row>

                    <Row>
                        <Col/> <Col/> <Col className="center"><PreviewCard height="100px"/></Col> <Col className="Divider"/>
                    </Row>

                    <Row>
                        <Col/> <Col/> <Col/> <Col className="center"><PreviewCard height="100px"/></Col>
                    </Row>
                </Container>
            </div>

            <Button
                variant="primary"
                onClick={() => {
                    setWin(true) ;
                    setLoss(false);
                }}
            >
                Click here to win
            </Button>

            <Button
                variant="primary"
                onClick={() => {
                    setWin(false);
                    setLoss(true) ;
                }}
            >
                Click to lose
            </Button>
        </div>
    );
}