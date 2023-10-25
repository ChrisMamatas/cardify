import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./ArenaDrafter.css";
import {FiBookmark} from "react-icons/fi";

export default function ArenaDrafter() {
    const now = 60;
    const record = [
        { card: 1 },
        { card: 2 },
        { card: 3 },
        { card: 4 },
        { card: 5 },
        { card: 6 },
        { card: 7 },
        { card: 8 },
    ];

    const table = [
        { record: 1 },
        { record: 2 },
        { record: 3 },
        { record: 4 },
    ];

    const players = [
        {player: 1},
        {player: 2},
        {player: 3},
        {player: 4},
        {player: 5},
        {player: 6},
        {player: 7},
        {player: 8},
    ];

    return (
        <div>
            <h1 className="center">
                Take turns drafting cards
            </h1>

            <Container>
                <Row>
                    <Col>
                        {table.map(item =>(
                            <Row key ={item.record} className={"m-4"}>
                                {record.map(item =>(
                                    <Col key ={item.card} className="d-flex">
                                        <div className="browse justify-content-center">
                                            <PreviewCard height="90px"/>
                                            <div className="flex-nowrap button-container">
                                                <button className="customBookmark">
                                                    <FiBookmark/>
                                                </button>
                                                <button className="customDraft">
                                                    Draft
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </Col>
                    <Col  md={{span: 1}}>
                        {players.map(item => (
                            <Row key = {item.player}>
                                Player
                                <div className="d-flex">
                                    <span>
                                        <PreviewCard  height="30px"/>
                                    </span>
                                    <span>
                                        <PreviewCard height="30px"/>
                                    </span>
                                    <span>
                                        <PreviewCard height="30px"/>
                                    </span>
                                    <span>
                                        <PreviewCard height="30px"/>
                                    </span>
                                </div>
                            </Row>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <div>
                        <ProgressBar animated now={now} label={`${now} sec`}/>
                    </div>
                </Row>
            </Container>
        </div>
    )
}