import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PreviewCard from '../components/cards/PreviewCard';
import { auth } from "../../firebaseConfig.ts";




export default function Cards() {

    const [cards, setCards] = useState([])

    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        fetch("http://localhost:8080/card", {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error()
                }
            })
            .then((data) => {
                console.log("data")
                console.log(data)
                setCards(data)
            })
            .catch((e) => alert(e))
    }

    return (
        <>

            <Container style={{ marginTop: "32px" }}>
                <Row md={12}>
                    {/*{cardData.map((card, index) => (*/}
                    {/*    <Col md={3}>*/}
                    {/*        <PreviewCard />*/}
                    {/*    </Col>*/}
                    {/*))}*/}
                    {
                        cards.map((card, index) => (
                            <Col md={3}>
                                <PreviewCard imageUrl={"data:image/png;base64," + card.image} />
                            </Col>
                        ))
                    }
                </Row>
                <Row style={{ marginTop: "32px" }}>
                    <Col md={6}>
                        <Link to={"/createcard"}>
                            <Button variant="primary" size="lg" style={{ float: 'left', width: '100%' }}>
                                Create Card
                            </Button>
                        </Link>
                    </Col>
                    <Col md={6} className='justify-content-md-end'>
                        <Button variant="primary" size="lg" style={{ float: 'right', width: '100%' }}>Delete Card</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
