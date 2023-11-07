import { Link } from "react-router-dom";
import { Container, Image, Row, Col } from "react-bootstrap";
import PreviewCard from "../../cards/PreviewCard";
import "../../Widgets.css"
import {useEffect, useState} from "react";
import {auth} from "../../../../firebaseConfig.ts";

interface Profile {
    username: string,
    profilePicture: string,
    elo: number,
    uid: string
}

export default function ProfileWidget() {

    const [profileData, setProfileData] = useState<Profile>()

    useEffect(() => {

        getData()
    }, [])

    async function getData() {

        auth.onAuthStateChanged(async (user) => {
            if (user) {

                const idToken = await user.getIdToken()
                await fetch("http://localhost:8080/user", {
                    headers: {
                        "Authorization": "Bearer " + idToken
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error()
                    })
                    .then((data) => {
                        console.log(data)
                        setProfileData(data)
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    return (
        <Link to={"/Profile"} className={"link"}>
            <div className={"Widget"}>

                <Container>
                    <Row className={"d-flex justify-content-center align-items-center"}>
                        <Col>
                            <Image src={profileData?.profilePicture} height={150} width={150} />
                            <h3>{profileData?.username}</h3>
                        </Col>

                        <Col className={"d-flex justify-content-center align-items-center flex-column"}>
                            <Image src={"https://cdn-icons-png.flaticon.com/512/473/473406.png"} height={100} style={{marginBottom: 20}} />
                            <p>{profileData?.elo}</p>
                        </Col>
                    </Row>

                    <Row>
                        <div style={{ padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}  >
                            <PreviewCard height="90px" />
                            <PreviewCard height="90px" />
                            <PreviewCard height="90px" />
                            <PreviewCard height="90px" />
                        </div>
                    </Row>
                </Container>
            </div>

        </Link>
    )
}