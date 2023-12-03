
import { useState, useEffect } from "react"
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Profile.css"
import { auth } from "../../firebaseConfig.ts";
import PreviewCard from "../components/cards/PreviewCard.tsx";
import { useNavigate } from "react-router-dom";
import RecentGame from "../components/profile/RecentGames.tsx";



export default function Profile() {

    const navigate = useNavigate()

    const [profile, setProfile] = useState<Profile>()
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getProfile()
        getCards()
    }, []);



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
        <div className={"d-flex m-5"}>
            <Container className={"mx-1"}>
                <Row className={"t"} style={{ height: "30vh", borderRadius: "3%" }}>
                    <Col>
                        <div style={{ display: "flex", flexDirection: "row"}}>
                            <div>
                                <Image className={"py-2"} src={profile ? profile.profilePicture : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={225} width={225} />
                                <h3>{profile?.username} {profile?.uid == auth.currentUser?.uid}</h3>
                            </div>
                            <div>
                                <h3 style={{ textAlign: "center" }}>Best Cards</h3>
                                <div className={"d-flex mx-4"}>
                                    <div>
                                        <Col md={10} >
                                            <div className="browse flex-nowrap button-container p-2">
                                                <PreviewCard
                                                    cardName={profile?.bestCards.bestAttack.cardAttributes.name || ""}
                                                    baseImage={profile?.bestCards.bestAttack.baseImage || ""}
                                                    frontCard={profile?.bestCards.bestAttack.frontCard || ""}
                                                    backCard={profile?.bestCards.bestAttack.backCard || ""} />
                                            </div>
                                        </Col>
                                        <h6 style={{ textAlign: "center" }}>Best Attack: {profile?.bestCards.bestAttack.cardAttributes.stats.attack}</h6>
                                    </div>
                                    <div>
                                        {
                                            <Col md={10} >
                                                <div className="browse flex-nowrap button-container p-2">
                                                    <PreviewCard
                                                        cardName={profile?.bestCards.bestDefense.cardAttributes.name || ""}
                                                        baseImage={profile?.bestCards.bestDefense.baseImage || ""}
                                                        frontCard={profile?.bestCards.bestDefense.frontCard || ""}
                                                        backCard={profile?.bestCards.bestDefense.backCard || ""} />
                                                </div>
                                            </Col>
                                        }
                                        <h3 style={{ textAlign: "center" }}>Base Defense: {profile?.bestCards.bestDefense.cardAttributes.stats.defense}</h3>
                                    </div>
                                    <div>
                                        {
                                            <Col md={10} >
                                                <div className="browse flex-nowrap button-container p-2">
                                                    <PreviewCard
                                                        cardName={profile?.bestCards.bestHealth.cardAttributes.name || ""}
                                                        baseImage={profile?.bestCards.bestHealth.baseImage || ""}
                                                        frontCard={profile?.bestCards.bestHealth.frontCard || ""}
                                                        backCard={profile?.bestCards.bestHealth.backCard || ""} />
                                                </div>
                                            </Col>
                                        }
                                        <h6 style={{ textAlign: "center" }}>Base Health: {profile?.bestCards.bestHealth.cardAttributes.stats.health}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={"d-flex t mt-2"} style={{ height: "20vh" }}>
                        <div className={"mt-2 align-items-center"}>
                            <div className={"d-flex"} style={{ width: "100%" }}>
                                {profile?.recentBattles && <RecentGame recentBattles={profile?.recentBattles} />}
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className={"my-2"}>
                    <Col className={"t"} style={{ height: "35vh", overflowY: "auto", borderRadius: "3%" }}>
                        <h3>Activity</h3>
                        {["Gunther won their first game today!"].map((txt) => {
                            return (
                                <div>
                                    <h5>{txt}</h5>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>

            <Container className={"mx-1"}>
                <Row>
                    <Col className={"t ml-1 p-2"} style={{borderRadius: "3%"}}>
                        <h3>Cards</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", height: "80vh", overflowY: "auto", padding: "10px"}}>
                            {
                                cards.map((card, index) => (
                                    <div className={"card-container browse"} >
                                        <PreviewCard
                                            height="auto"
                                            cardName={card.cardAttributes.name}
                                            baseImage={card.baseImage}
                                            frontCard={card.frontCard}
                                            backCard={card.backCard} />
                                    </div>
                                ))
                            }
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}