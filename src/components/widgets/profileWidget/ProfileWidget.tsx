import { Link } from "react-router-dom";
import { Container, Image, Row, Col } from "react-bootstrap";
import "../../Widgets.css"
import { useEffect, useState } from "react";
import { auth } from "../../../../firebaseConfig.ts";
import PreviewCard from "../../cards/PreviewCard.tsx";

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
    const [profile, setProfile] = useState<Profile>()

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
            getProfile()

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

    async function getProfile() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.getIdToken()
                await fetch("http://localhost:8080/user/profile", {
                    headers: {
                        "Authorization": "Bearer " + idToken
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                    })
                    .then((data) => {
                        setProfile(data)
                    })
                    .catch((e) => alert(e))
            }
            else {
                console.log("There is no user")
            }
        })
    }


    return (
        <Link to={"/Profile"} className={"link"}>
            <div className={"Widget"}>

                <Container>
                    <Row className={"d-flex justify-content-center align-items-center"}>
                        <Col>
                            <Image src={profileData?.profilePicture} max-height={150} />
                        </Col>
                        <Col>
                            <h3 >{profileData?.username}</h3>
                        </Col>

                    </Row>
                    <div className={"best-cards-container"}>

                        <Row className={".card-row"} style={{ padding: 0, display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "2em", padding: "1em" }}>
                            <h1 style={{ textAlign: "center" }}>Best Cards</h1>
                            <Col md={3} >
                                <PreviewCard
                                    height="100px"
                                    cardName={profile?.bestCards.bestAttack.cardAttributes.name || ""}
                                    baseImage={profile?.bestCards.bestAttack.baseImage || ""}
                                    frontCard={profile?.bestCards.bestAttack.frontCard || ""}
                                    backCard={profile?.bestCards.bestAttack.backCard || ""} />
                            </Col>
                            <Col md={3} >
                                <PreviewCard
                                    height="100px"
                                    cardName={profile?.bestCards.bestDefense.cardAttributes.name || ""}
                                    baseImage={profile?.bestCards.bestDefense.baseImage || ""}
                                    frontCard={profile?.bestCards.bestDefense.frontCard || ""}
                                    backCard={profile?.bestCards.bestDefense.backCard || ""} />
                            </Col>
                            <Col md={3} >
                                <PreviewCard
                                    height="100px"
                                    cardName={profile?.bestCards.bestHealth.cardAttributes.name || ""}
                                    baseImage={profile?.bestCards.bestHealth.baseImage || ""}
                                    frontCard={profile?.bestCards.bestHealth.frontCard || ""}
                                    backCard={profile?.bestCards.bestHealth.backCard || ""} />
                            </Col>

                        </Row>
                    </div>
                </Container>
            </div>

        </Link >
    )
}