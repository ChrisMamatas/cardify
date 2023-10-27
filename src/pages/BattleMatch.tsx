import {Col, Container, Row} from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./BattleMatch.css"

export default function BattleMatch() {
    const player = [
        {card: 1},
        {card: 2},
        {card: 3},
        {card: 4},
    ];
    const opp = [
        {card: 1},
        {card: 2},
        {card: 3},
        {card: 4},
    ];

    return (
        <div>
            <h1 className="center">
                FIGHT
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
        </div>
    )
}