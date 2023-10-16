import { Link } from "react-router-dom";
import './Widgets.css'
import { Container, Image, Row, Col } from "react-bootstrap";
import Card from "./cards/FullCard";

const profile = {
    username: "username",
    level: 32,
    rank: "warrior"
}

export default function ProfileWidget() {

    return (
        <Link to={"/Profile"} className={"link"}>
            <div className={"Widget"}>

                <Container>
                    <Row className={"d-flex justify-content-center align-items-center"}>
                        <Col md={4}>
                            <Image src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} height={150} />
                        </Col>

                        <Col className={"d-flex justify-content-center align-items-center"}>
                            <Image src={"https://cdn-icons-png.flaticon.com/512/473/473406.png"} height={100} />
                        </Col>
                    </Row>

                    <Row>
                        <p>{profile.username} - {profile.level}</p>
                    </Row>

                    <Row style={{ padding: 0 }}>
                        <Col>
                            <Card />
                        </Col>
                        <Col>
                            <Card />
                        </Col>
                        <Col>
                            <Card />
                        </Col>
                        <Col>
                            <Card />
                        </Col>
                    </Row>
                </Container>
            </div>

        </Link>
    )
}