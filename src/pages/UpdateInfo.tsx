import { Container, Row, Col, Image } from "react-bootstrap";
import "./Profile.css"
export default function UpdateInfo() {

    return (
        <div>
            <Container fluid className={"justify-content-between"}>
                <Row>
                    <Col className="center">
                        <Image src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={200} />
                    </Col>
                    <Col className="center">
                        <button>Change Profile Pic</button>
                    </Col>
                    <Col/>
                    <Col className="center">
                        <div className="center">
                            <h1>hello</h1>
                        </div>
                    </Col>
                    <Col className="center">
                        <button>hello</button>
                    </Col>
                </Row>
                <Row>
                    <Col className="center">
                        <div>
                            <h1>"Username"</h1>
                        </div>
                    </Col>
                    <Col className="center">
                        <button>Change Username</button>
                    </Col>
                    <Col/>
                    <Col className="center">
                        <h1>Hello</h1>
                    </Col>
                    <Col className="center">
                        <h1>Hello</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="center">
                        <Image src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={200} />
                    </Col>
                    <Col className="center">
                        <h1>Hello</h1>
                    </Col>
                    <Col/>
                    <Col className="center">
                        <h1>Hello</h1>
                    </Col>
                    <Col className="center">
                        <h1>Hello</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}