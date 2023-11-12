import { Col, Container, Row } from "react-bootstrap";
import Card from "../cards/PreviewCard.tsx";
import {useEffect, useState} from "react";
import {auth} from "../../../firebaseConfig.ts";
import PreviewCard from "../cards/PreviewCard.tsx";

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

export default function BestCards() {

    const [profileData, setProfileData] = useState<Profile>()
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
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
                        console.log(data);
                        setProfileData(data);
                        setCards(data.cards);
                        console.log(cards);
                    })
                    .catch((e) => console.log(e));
            }
        });
    }

    return (
        <>
            <Container>
                <Row>
                    Featured Cards
                </Row>
                <Row>
                    <Col>
                        {
                            cards.splice(0,3).map((card, index) => (
                                <Col md={4} key={index}> {/* Added key for list items */}
                                    <PreviewCard
                                        cardName={card.cardAttributes.name}
                                        baseImage={card.baseImage}
                                        frontCard={card.frontCard}
                                        backCard={card.backCard} />
                                </Col>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}