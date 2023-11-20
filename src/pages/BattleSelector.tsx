import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig.ts";
import { useEffect, useState } from "react";
import "./BattleSelector.css"
import { useBattle } from "../context/BattleContext.tsx";
import SelectCard from "../components/cards/SelectCard.tsx";
import Image from "react-bootstrap/Image"

export default function BattleSelector() {
    const [cards, setCards] = useState<Card[]>([]);
    const [selected, setSelected] = useState<string[]>([])
    const [playerOneImage, setPlayerOneImage] = useState<string>("")
    const [playerTwoImage, setPlayerTwoImage] = useState<string>("")
    const battleContext = useBattle();

    useEffect(() => {
        getCards()
    }, []);

    useEffect(() => {
        console.log('Battle session updated:', battleContext?.battleSession)

    }, [battleContext?.battleSession])

    useEffect(() => {
        const sessionId = battleContext?.battleSession?.id;
        if (sessionId) {

            battleContext?.subscribeToBattleTopic(`${sessionId}`);
            getImage()
        }

        return () => {
            if (sessionId) {

                battleContext?.unsubscribeFromBattleTopic(`${sessionId}`);
            }
        };
    }, []);



    async function getCards() {
        console.log("getting cards")
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                fetch("http://localhost:8080/card", {
                    headers: {
                        "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                        setCards(data)
                        console.log(data)
                    })
                    .catch((e) => alert(e))
            }
        });
    }

    function cardPress(id: string) {

        if (selected.includes(id)) {
            let tmp = selected.filter((curr) => curr !== id)
            setSelected(tmp)
        }
        else if (selected?.length < 4) {
            setSelected([...selected, id])
        }
    }

    async function sendCards() {

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetch("http://localhost:8080/battle/set-cards/" + battleContext?.battleSession?.id, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cardIds: selected
                    })
                }).then((response) => console.log(response))
            }
        })
    }

    async function getImage() {
        console.log("getting image")
        fetch("http://localhost:8080/user/" + battleContext?.battleSession?.players[0].playerUserName, {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => setPlayerOneImage(data.profilePicture))

        fetch("http://localhost:8080/user/" + battleContext?.battleSession?.players[1].playerUserName, {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => setPlayerTwoImage(data.profilePicture))

    }

    return (
        <div style={{ gap: 20, height: "94vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "50%" }}>
                {battleContext?.battleSession && (
                    <div>
                        {/*<p>Session ID: {battleContext?.battleSession?.id}</p>*/}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                            {battleContext?.battleSession?.players.map((player, index) => (
                                <div key={index} style={{ width: "50%" }}>
                                    <div>
                                        <Image src={index == 0 ? playerOneImage : playerTwoImage} style={{ marginLeft: 10, marginRight: 10, height: 100, width: 100, float: index === 0 ? "left" : "right" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: "bold", textAlign: index === 1 ? "right" : "left" }}>{battleContext?.battleSession?.players[index].playerUserName}</p>
                                        <p style={{ textAlign: index === 1 ? "right" : "left" }}>{player.confirmed ? "Connected" : "Not Connected"} </p>
                                        <p style={{ textAlign: index === 1 ? "right" : "left" }}>{player.ready ? "Ready" : "Not Ready"}</p>
                                    </div>

                                </div>

                            )
                            )}
                        </div>

                    </div>
                )}
            </div>

            <div>
                <h1 className="center">Choose 4 cards to battle with</h1>
                <div style={{ display: "flex", flexWrap: "wrap", width: "60vw", justifyContent: "center", height: "60vh", overflowY: "auto", backgroundColor: "gray", padding: "10px", borderRadius: "10px" }}>
                    {
                        cards.map((card, index) => (
                            <div className={"card-container"} onClick={() => cardPress(card.cardId)} style={{ backgroundColor: selected.includes(card.cardId) && "green" || "" }}>
                                <SelectCard card={card} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <button onClick={sendCards}>PLAY!</button>
            </div>

        </div>
    )
}
