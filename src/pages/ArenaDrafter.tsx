import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import "./ArenaDrafter.css";
import {FiBookmark} from "react-icons/fi";

export default function ArenaDrafter() {
    const now = 60;
    return (
        <div>
            <h1 className="center">
                Take turns drafting cards
            </h1>

            <Container>
                <Row>
                    <Col>
                        <Row className={"m-4"}>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                    <div className="flex-nowrap">
                                        <button className="custom" style={{borderBottomLeftRadius:"50%"}}>
                                            <FiBookmark/>
                                        </button>
                                        <button className="custom" style={{borderBottomRightRadius:"50%"}}>
                                            Draft
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"m-4"}>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"m-4"}>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"m-4"}>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                            <Col className="d-flex">
                                <div className="browse justify-content-center">
                                    <PreviewCard height="90px"/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{span: 1}}>
                        <Row>
                            Name1
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
                        <Row >
                            Name2
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
                        <Row>
                            Name3
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
                        <Row>
                            Name4
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
                        <Row>
                            Name5
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
                        <Row>
                            Name6
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
                        <Row>
                            Name7
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
                        <Row>
                            Name8
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