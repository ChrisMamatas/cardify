import { Image } from "react-bootstrap";
import { Modal, ModalProps, Button } from 'react-bootstrap';
import {BattleCard} from "../components/cards/SelectCard.tsx";
import "./BattleMatch.css"
import {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import { auth } from "../../firebaseConfig.ts";
import { useBattle } from "../context/BattleContext.tsx";
import { motion } from "framer-motion"

interface Player {
    uid: string,
    username: string,
    elo: number,
    profilePicture: string
}

interface AnimatedCardProps {
    card: Card,
    index: number,
    animate: (value: number) => void
}

interface Move {
    player1CardId: number;
    player2CardId: number;
    isPlayer1Move: boolean;
    player1CardIdKilled?: string;
    player2CardIdKilled?: string;
    damageDealt: number;
}

// Define the main data structure type
interface BattleData {
    _id: {
        $oid: string;
    };
    sessionId: string;
    turns: {
        Player1CardStates: Card[];
        Player2CardStates: Card[];
        CurrentMove: Move;
    }[];
    player1Id: string;
    player2Id: string;
    player1Win: boolean;
    date: string;
    _class: string;
}


const AnimatedCard = forwardRef( ({ card, index }: AnimatedCardProps, ref: ForwardedRef<unknown>) => {
    useImperativeHandle(ref, () => {

        return {
            animate: animate
        }

    })
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);

    function animate() {
        setX(100)
    }

    return (
        <motion.div
            className={""}
            animate={{ x, y, rotate }}
            transition={{ type: "spring" }}
        >
            <BattleCard
                card={card}
                key={card.cardId}
                height={"300px"}
            />
        </motion.div>
    )
})

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

    const cardRefs = useRef<any>({})
    const [moves, setMoves] = useState<BattleData | null>()

    useEffect(() => {
        getCards()
    }, [battleContext?.battleSession]);


    useEffect(() => {
        const sessionId = battleContext?.battleSession?.id;
        if (sessionId) {

            battleContext?.subscribeToBattleTopic(`${sessionId}`);
            getBattle()
        }

        return () => {
            if (sessionId) {

                battleContext?.unsubscribeFromBattleTopic(`${sessionId}`);
            }
        };
    }, []);


    async function getBattle() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetch("http://localhost:8080/battle/" + battleContext?.battleSession?.id, {
                    headers: {
                        "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
                        "Content-Type": "application/json"
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error("Could Not Get Battle")
                    })
                    .then((data) => {
                        setMoves(data)
                        gameLoop()
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    function gameLoop() {

        console.log(moves)
        // let turns = moves.turns
        // turns.map((turn, index) => {
        //     // PLAY THE MOTION
        //     // cardRefs.current[turn.isPlayer1Move ? turn.CurrentMove.player1CardId : turn.currentMove.player2CardId].animate()
        //
        // })
    }

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

                    {/* THIS IS TESTING STUFF FOR ANIMATING */}
                    {/*<button onClick={() => animate(id)}>Do an animation</button>*/}
                    {/*<input type={'number'} value={id} placeholder={0} onChange={e => setId(parseInt(e.target.value))}/>*/}

                    <div className={"center"}>
                        <Image src={localPlayer?.profilePicture} style={{height: "100px", width: "100px"}} />
                        <h3>{localPlayer?.username}</h3>
                    </div>
                </div>

                <div className={"card-column"}>
                    <div className={"card-row"}>
                        {opponentPlayerCards.map((card, index) => {
                            return (
                                <AnimatedCard card={card} ref={el => cardRefs.current[index] = el} index={index} />
                            )
                        })}
                    </div>

                    <div style={{height: "10vh"}} />

                    <div className={"card-row"}>
                        {localPlayerCards.map((card, index) => {
                            return (
                                <AnimatedCard card={card} ref={el => cardRefs.current[index + 4] = el} index={index + 4} />
                            )
                        })}
                    </div>

                </div>

            </div>

        </div>
    );
}