import { Image } from "react-bootstrap";
import { Modal, ModalProps, Button } from 'react-bootstrap';
import {BattleCard} from "../components/cards/SelectCard.tsx";
import "./BattleMatch.css"
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig.ts";
import { useBattle } from "../context/BattleContext.tsx";
import { motion } from "framer-motion"

interface Player {
    uid: string,
    username: string,
    elo: number,
    profilePicture: string
}

function WinModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">You Win!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="center">+100xp</p>
                <p className="center">+5000 Gold</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button> {/* Add onHide prop here */}
            </Modal.Footer>
        </Modal>
    );
}

function LoseModal(props: ModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">You Lose!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="center">-5000 Gold</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button> {/* Add onHide prop here */}
            </Modal.Footer>
        </Modal>
    );
}

export default function BattleMatch() {
    const [isWin, setWin] = useState(false);
    const [isLoss, setLoss] = useState(false);
    const battleContext = useBattle();
    const [localPlayerCards, setLocalPlayerCards] = useState<Card[]>([]);
    const [opponentPlayerCards, setOpponentPlayerCards] = useState<Card[]>([]);
    const [localPlayer, setLocalPlayer] = useState<Player>()
    const [opponentPlayer, setOpponentPlayer] = useState<Player>()

    useEffect(() => {
        getCards()
    }, [battleContext?.battleSession]);


    useEffect(() => {
        const sessionId = battleContext?.battleSession?.id;
        if (sessionId) {

            battleContext?.subscribeToBattleTopic(`${sessionId}`);
        }

        return () => {
            if (sessionId) {

                battleContext?.unsubscribeFromBattleTopic(`${sessionId}`);
            }
        };
    }, []);



    async function getCards() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {

                console.log("[][]][]")
                console.log(battleContext?.battleSession?.players)
                battleContext?.battleSession?.players.forEach((player) => {
                    if (player.playerId === user.uid) {

                        getPlayerCards(player.selectedCardIds, true);
                        getPlayer(player.playerUserName, true)
                    } else {
                        getPlayerCards(player.selectedCardIds, false);
                        getPlayer(player.playerUserName, false)
                    }
                });


            }
        })
    }

    async function getPlayer(username: string, isLocalPlayer: boolean) {

        await fetch("http://localhost:8080/user/" + username, {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken()
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                if (isLocalPlayer) {
                    setLocalPlayer(data)
                }
                else {
                    setOpponentPlayer(data)
                }
            })
            .catch((e) => console.log(e))
    }

    async function getPlayerCards(cardIds: string[], isLocalPlayer: boolean) {
        const encodedString = cardIds.join(",")
        const url = new URL('http://localhost:8080/card');
        url.searchParams.append('ids', encodedString);

        fetch(url, {
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

                if (isLocalPlayer) {
                    setLocalPlayerCards(data)
                } else {
                    setOpponentPlayerCards(data)
                }
            })
            .catch((e) => console.log(e))
    }

    return (
        <div className={"custom-container"}>
            {isWin && (
                <WinModal show={true} onHide={() => setWin(false)} />
            )}

            {isLoss && (
                <LoseModal show={true} onHide={() => setLoss(false)} />
            )}

            <div className={"two-column"}>
                <div className={"name-column"}>

                    <div className={"center"}>
                        <Image src={opponentPlayer?.profilePicture} style={{height: "100px", width: "100px"}} />
                        <h3>{opponentPlayer?.username}</h3>
                    </div>

                    <div className={"center"}>
                        <Image src={localPlayer?.profilePicture} style={{height: "100px", width: "100px"}} />
                        <h3>{localPlayer?.username}</h3>
                    </div>
                </div>

                <div className={"card-column"}>
                    <div className={"card-row"}>
                        {opponentPlayerCards.map((card, index) => {
                            return (
                                <BattleCard
                                    card={card}
                                    key={card.cardId}
                                    height={"300px"}
                                />
                            )
                        })}
                    </div>

                    <div style={{height: "10vh"}} />

                    <div className={"card-row"}>
                        {localPlayerCards.map((card, index) => {
                            return (
                                <BattleCard
                                    card={card}
                                    key={card.cardId}
                                    height={"300px"}
                                />
                            )
                        })}
                    </div>
                </div>

            </div>

        </div>
    );
}