import {Col, Container, Row} from "react-bootstrap";
import PreviewCard from "../components/cards/PreviewCard.tsx";


export default function ArenaDrafter() {
    return (
        <div>
            <h1 className="center">
                Choose 4 cards to battle with
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
    )
}