import { Col, Container, Row } from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import {Link, Route, Routes} from "react-router-dom";
import ArenaDrafter from "./ArenaDrafter.tsx";

export default function ArenaSelector() {

    return (
        <>
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
                        <button style={{alignSelf: "center"}}>
                            Confirm
                        </button>
                    </Row>
                </Container>
            </div>

            <Link to={"/ArenaSelector"} className={"link"}>
                <div className={"Widget center"}>
                    <h1>Deck</h1>
                </div>

                <Routes>
                    <Route path={"/ArenaDrafter"} element={<ArenaDrafter/>}/>
                </Routes>
            </Link></>
    )
}
