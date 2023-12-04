import {Card, Image} from "react-bootstrap";
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
    const parentRef = useRef(null);
    const resetTimeoutRef = useRef<any>(null);
    const damageTimeoutRef = useRef<any>(null)

    const [hp, setHp] = useState<number>(card.cardAttributes.stats.health)
    const [hpLoss, setHpLoss] = useState<number>(0)
    const [opacity, setOpacity] = useState<number>(0)

    useImperativeHandle(ref, () => {
        return {
            animate: animate,
            getParentRef: () => parentRef.current,
            getCardId: getCardId,
            takeDamage: takeDamage
        };
    });

    function getCardId() {
        return card.cardId
    }

    function animate(animateId: string, x: number, y: number) {
        console.log("PLEASE FUCKING ANIMATE")
        // Move to the specified (x, y) coordinate

        console.log(animateId)
        setOppX(parseInt(x, 10))
        setOppY(parseInt(y, 10))

        // Set a timeout to reset the position after a delay (e.g., 1000ms)
        resetTimeoutRef.current = setTimeout(() => {
            setOppX(0)
            setOppY(0)
        }, 500);
    }

    function takeDamage(damage: number) {

        setHp(hp - damage)
        setHpLoss(damage)
        setOpacity(1)

        damageTimeoutRef.current = setTimeout(() => {
            setOpacity(0)
        }, 100);
    }

    // Clear the timeout on component unmount or when position changes
    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
            if (damageTimeoutRef.current) {
                clearTimeout(damageTimeoutRef.current);
            }

        };
    }, []);

    return (
        <div style={{opacity: hp <= 0 ? 0.25 : 1}}>
            <motion.div
                ref={parentRef}
                initial={{ x: 0, y: 0}}
                animate={{ x: oppX, y: oppY }}
                transition={{ duration: 0.15 }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <motion.div
                    initial={{ opacity: 1, scale: 0.5 }}
                    animate={{ opacity: opacity, scale: 1 }}
                    transition={{ duration: 0.20 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'brown',
                        zIndex: 2
                    }}
                >
                    <h1 className={"d-flex justify-content-center align-items-center"}>{"-" + hpLoss}</h1>
                </motion.div>
                <BattleCard card={card} key={card.cardId} height={'300px'} currHealth={hp} />
            </motion.div>
        </div>
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

// We have to implement a sleep function using promises because javascript is the worst fucking language ever created
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
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
    const [moves, setMoves] = useState<BattleData>()

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
                        gameLoop()
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    async function gameLoop() {

        console.log("GAME LOOP")
        console.log(moves)

        // Fill a hashmap with our cards and their x,y
        const cardCordMap = new Map();
        const cardMap = new Map();
        for (let i = 0; i < 8; i++) {
            // Get the coords of each card
            const rect = cardAnimateRefs.current[i].getParentRef().getBoundingClientRect()
            const x = rect.left + window.pageXOffset
            const y = rect.top + window.pageYOffset

            cardCordMap.set(cardAnimateRefs.current[i].getCardId(), [x, y])
            cardMap.set(cardAnimateRefs.current[i].getCardId(), i)
        }

        // Loop through the game
        for (let i = 0; i < moves?.turns?.length; i++) {
            let turn = moves.turns[i]

            console.log(turn, "turn")

            await sleep(2000)

            if (turn.currentMove.player1Move) {

                let attacker = cardMap.get(turn.currentMove.player1CardId)
                let victim = cardCordMap.get(turn.currentMove.player2CardId)

                cardAnimateRefs.current[attacker].animate(turn.currentMove.player2CardId, victim[0] - cardCordMap.get(turn.currentMove.player1CardId)[0],
                    cardCordMap.get(turn.currentMove.player1CardId)[1] < victim[1] ? 100 : -100)

                cardAnimateRefs.current[cardMap.get(turn.currentMove.player2CardId)].takeDamage(turn.currentMove.damageDealt)
            }
            else {

                let attacker = cardMap.get(turn.currentMove.player2CardId)
                let victim = cardCordMap.get(turn.currentMove.player1CardId)

                cardAnimateRefs.current[attacker].animate(turn.currentMove.player1CardId, victim[0] - cardCordMap.get(turn.currentMove.player1CardId)[0],
                    cardCordMap.get(turn.currentMove.player2CardId)[1] < victim[1] ? 100 : -100)

                cardAnimateRefs.current[cardMap.get(turn.currentMove.player1CardId)].takeDamage(turn.currentMove.damageDealt)
            }
        }
    }

    async function getCards() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
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