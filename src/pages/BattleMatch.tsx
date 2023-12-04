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
}

interface Move {
    player1CardId: number;
    player2CardId: number;
    player1Move: boolean;
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
        player1CardStates: Card[];
        player2CardStates: Card[];
        currentMove: Move;
    }[];
    player1Id: string;
    player2Id: string;
    player1Win: boolean;
    date: string;
    _class: string;
}


const AnimatedCard = forwardRef(({ card, index }: AnimatedCardProps, ref: ForwardedRef<unknown>) => {
    const [oppX, setOppX] = useState(0)
    const [oppY, setOppY] = useState(0)
    const [rotate, setRotate] = useState(0);
    const parentRef = useRef(null);
    const resetTimeoutRef = useRef<any>(null);

    useImperativeHandle(ref, () => {
        return {
            animate: animate,
            getParentRef: () => parentRef.current,
        };
    });

    function animate(animateId: string, x: number, y: number) {
        if (card.cardId === animateId) {
            console.log("PLEASE FUCKING ANIMATE")
            // Move to the specified (x, y) coordinate
            console.log(x)
            setOppX(parseInt(x, 10))
            setOppY(parseInt(y, 10))

            // Set a timeout to reset the position after a delay (e.g., 1000ms)
            resetTimeoutRef.current = setTimeout(() => {
                setOppX(0)
                setOppY(0)
            }, 1000);
        }
    }

    // Clear the timeout on component unmount or when position changes
    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, [oppX, oppY]);

    return (
        <motion.div
            ref={parentRef}
            initial={{ x: 0, y: 0}}
            animate={{ x: oppX, y: oppY }}
            transition={{ duration: 0.25 }}
        >
            <BattleCard card={card} key={card.cardId} height={'300px'} />
        </motion.div>
    );
});

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

    const cardAnimateRefs = useRef<any>({})
    const cardRefs = useRef<any>()
    const [moves, setMoves] = useState<BattleData | null>()

    useEffect(() => {
        getCards()
    }, [battleContext?.battleSession]);

    useEffect(() => {
        if (battleContext?.battleSession?.battleGenerated) {
            getBattle()
        }
    }, [battleContext?.battleSession?.battleGenerated]);


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
                        gameLoop(data)
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    function gameLoop() {

        console.log(moves, "")
        let turns = moves.turns
        turns.map((turn, index) => {

            console.log("mapping")
            if (turn.currentMove.player1Move) {

                // Get the coords of the card we are to attack
                const rect = cardAnimateRefs.current[turn.currentMove.player2CardId].getParentRef().getBoundingClientRect()
                // const rect = element.getBoundingClientRect()
                const x = rect.left + window.pageXOffset
                const y = rect.top + window.pageYOffset

                cardAnimateRefs.current[turn.currentMove.player1CardId].animate(opponentPlayerCards[turn.currentMove.player2CardId].cardId, x, y)

            }
            else {
                // Get the coords of the card we are to attack
                const rect = cardAnimateRefs.current[turn.currentMove.player1CardId].getParentRef().getBoundingClientRect()
                // const rect = element.getBoundingClientRect()
                const x = rect.left + window.pageXOffset
                const y = rect.top + window.pageYOffset

                cardAnimateRefs.current[turn.currentMove.player2CardId].animate(opponentPlayerCards[turn.currentMove.player2CardId].cardId, x, y)
            }

        })
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
            <button onClick={gameLoop}>GAME TEST</button>
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
                                <AnimatedCard card={card} ref={el => cardAnimateRefs.current[index] = el} index={index} />
                            )
                        })}
                    </div>

                    <div style={{height: "10vh"}} />

                    <div className={"card-row"}>
                        {localPlayerCards.map((card, index) => {
                            return (
                                <AnimatedCard card={card} ref={el => cardAnimateRefs.current[index + 4] = el} index={index + 4} />
                            )
                        })}
                    </div>

                </div>

            </div>

        </div>
    );
}