import { Link } from "react-router-dom";
import { Container, Image, Row, Col } from "react-bootstrap";
import PreviewCard from "../../cards/PreviewCard";
import "../../Widgets.css"
import { useEffect, useState } from "react";
import { auth } from "../../../../firebaseConfig.ts";

interface Profile {
    username: string,
    profilePicture: string,
    elo: number,
    uid: string
}

interface CardAttributes {
    name: string;
    colors: {
        dominantHex: string;
        dominantRgb: {
            r: number;
            g: number;
            b: number;
        };
        accentHex: string;
        accentRgb: {
            r: number;
            g: number;
            b: number;
        };
    };
    stats: {
        lightAttack: number;
        heavyAttack: number;
        speed: number;
        defense: number;
    };
}

interface Card {
    baseImage: string;
    frontCard: string;
    backCard: string;
    cardId: string;
    cardAttributes: CardAttributes; // Correct the case to match the response
}

export default function ProfileWidget() {

    const [profileData, setProfileData] = useState<Profile>()
    const [cards, setCards] = useState<Card[]>([]);


    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            getData()
            getCards()
        }
    }, [isAuthenticated]);

    async function getData() {
        await fetch("http://localhost:8080/user", {
            headers: {
                "Authorization": "Bearer " + (await auth.currentUser?.getIdToken()),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then((data) => {
                setProfileData(data)
            })
            .catch((e) => console.log(e));
    }

    async function getCards() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetch("http://localhost:8080/card", {
                    headers: {
                        "Authorization": "Bearer " + (await auth.currentUser?.getIdToken()),
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error();
                        }
                    })
                    .then((data) => {
                        setCards(data);
                    })
                    .catch((e) => console.log(e));
            }
        });
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
                            <Image src={"https://cdn-icons-png.flaticon.com/512/473/473406.png"} height={100} style={{ marginBottom: 20 }} />
                            <p>{profileData?.elo}</p>
                        </Col>
                    </Row>

                    <Row style={{ padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                        {
                            cards && cards.slice(0, 4).map((card, index) => (
                                <Col md={3} key={index}>
                                    <PreviewCard
                                        cardName={card.cardAttributes.name}
                                        baseImage={card.baseImage}
                                        frontCard={card.frontCard}
                                        backCard={card.backCard} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>

        </Link>
    )
}