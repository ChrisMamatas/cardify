import Card from "../cards/PreviewCard";
import { Container, Row, Col } from "react-bootstrap";
import PreviewCard from "../cards/PreviewCard";
import {useEffect, useState} from "react";
import {auth} from "../../../firebaseConfig.ts";

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

export default function Showcase() {
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
        <Container>
            <Row>
                Showcase
            </Row>
            <Row>
                {
                    cards && cards.map((card, index) => (
                        <Col md={3} key={index}> {/* Added key for list items */}
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
    )
}