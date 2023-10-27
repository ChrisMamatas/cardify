import { Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import {Link, Route, Routes} from "react-router-dom";

export default function ArenaSelector() {

    return (

            <div>
                <h1 className="center">
                    Select 4 cards to enter into draft
                </h1>

                <Container>
                    <Row className={"m-4"}>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>

                    </Row>
                    <Row className={"m-4"}>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>
                        <Col>
                            <PreviewCard/>
                        </Col>
                    </Row>

                    <Row>
                        <Link to={"/ArenaDrafter"}>
                            <button variant ="primary" size="lg" style={{ float: 'left', width: '100%' }}>
                                Confirm
                            </button>
                        </Link>
                    </Row>
                </Container>
            </div>


    )
}
