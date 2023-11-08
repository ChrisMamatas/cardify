import {ChangeEvent, useEffect, useState} from "react";
import { auth } from "../../firebaseConfig.ts"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import {Col, Container, InputGroup, Row} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import {FiUpload} from "react-icons/fi"

interface ProfileData {
    username: string
    profilePicture: string,
    elo: number,
    showcase: string[]
}
export default function PostRegister() {

    const [data, setData] = useState<ProfileData>()
    const [newUsername, setNewUsername] = useState<string>()
    const [imageOne, setImageOne] = useState<any>(null)

    useEffect(() => {
        getData()
    }, []);

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
                    .then((d) => {
                        setData(d)
                        setNewUsername(d.username)
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageOne(e.target.result as string);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className={"d-flex flex-row m-2 justify-content-center align-items-center"} style={{height: "100vh"}}>

            <Container>
                <Row>
                    <h3 style={{textAlign: "center"}}>Create Your First Cards</h3>
                </Row>
                <Row>
                    <Col>
                        <input
                            style={{opacity: 0, display: "flex", height: 400, backgroundColor: "gray", marginBottom: 10, justifyContent: "center", alignItems: "center"}}
                            type="file"
                            onChange={handleFileUpload}
                        />

                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 400, backgroundColor: "gray", marginBottom: 10}}>

                        </div>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 400, backgroundColor: "gray", marginBottom: 10}}>

                        </div>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 400, backgroundColor: "gray", marginBottom: 10}}>

                        </div>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <button>Create</button>
                </Row>
            </Container>

        </div>
    )
}