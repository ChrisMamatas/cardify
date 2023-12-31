import "../../Widgets.css"
import "./SocialWidget.css"
import { BsPersonAdd } from "react-icons/bs";
import { Button, Image, OverlayTrigger, Popover, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Link, redirect } from "react-router-dom";
import { auth } from "../../../../firebaseConfig.ts";
import { useEffect, useState, useContext } from "react";
import { useBattle } from "../../../context/BattleContext.tsx";

interface Friend {
    uid: string,
    username: string,
    elo: number,
    profilePicture: string
}


export default function SocialWidget() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const battleSession = useBattle()
    const navigate = useNavigate()
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
        }
    }, [isAuthenticated]);

    const [currentPopupUsername, setCurrentPopupUsername] = useState<string | null>(null);
    const createPopup = (friend: Friend) => {
        if (currentPopupUsername === friend.username) {
            console.log('Removing popup');
            setCurrentPopupUsername(null);
        } else {
            console.log('Setting current popup username: ', friend.username);
            setCurrentPopupUsername(friend.username);
        }
    };

    async function getData() {

        fetch("http://localhost:8080/users", {
            headers: {
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    // throw new Error("Failed to retrieve friends")
                }
            })
            .then((data) => {
                setFriends(data)
            })
            .catch((e) => alert(e))
    }

    async function challengeRequest(uid: string) {
        fetch("http://localhost:8080/battle/request/" + uid, {
            method: 'POST',
            body: "{}",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error("failed to send challenge request")
                }
            })
            .then((data) => {
                battleSession?.saveBattleSession(data);
                navigate('/BattleSelector')
            })
            .catch((e) => alert(e))
    }


    return (
        // <div className={`friendsWidget-${screenSize} Widget`}>
        // <div className={`friendsWidget Widget`}>
        <div style={{ height: "100%", backgroundColor: "#424B54", borderRadius: 10 }}>
            <div className={"header"} style={{ backgroundColor: "var(--tertiary)" }}>
                <h5 style={{ marginBottom: "0rem" }}>Friends</h5>
                <h5><BsPersonAdd /></h5>
            </div>
            {/*<div className={`friends-${screenSize} overflow-y-scroll friend-list`}>*/}
            <div style={{ height: "88%", overflowY: "auto" }} className={`friends friend-list`}>

                {friends?.map(friend => (
                    <div onClick={() => createPopup(friend)} key={friend.username}>
                        <OverlayTrigger
                            show={currentPopupUsername === friend.username}
                            trigger="click"
                            key={friend.username}
                            placement={"top"}
                            overlay={
                                <Popover id={`popover-positioned`} style={{ backgroundColor: "#424B54" }} >
                                    <Popover.Body>
                                        <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                            <h6>{friend.username}</h6>
                                            <button onClick={() => navigate("/trading")} >Trade</button>
                                            <button>Message</button>
                                            <button onClick={() => challengeRequest(friend.uid)}>Battle</button>
                                        </div>

                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <div className={"d-flex p-2 m-2 align-items-center friend-item"}>
                                <Image src={friend.profilePicture} height={50} />
                                <div className={"px-2"}>
                                    <p>{friend.username}</p>
                                    {/* <p style={{ fontSize: "0.75em" }}>{friend.online ? "Online" : "Offline"}</p> */}
                                    <p style={{ fontSize: "0.75em" }}>{"Online"}</p>

                                </div>
                            </div>
                        </OverlayTrigger>
                    </div>
                ))}
            </div>
        </div>

    );
}
