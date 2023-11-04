
import { useState, useEffect } from "react"
import { Container, Row, Col, Image } from "react-bootstrap";
import Showcase from "../components/profile/Showcase"
import BestCards from "../components/profile/BestCards.tsx";
import "./Profile.css"
import "./Profile.css"
import {auth} from "../../firebaseConfig.ts";
import FullCard from "../Components/cards/FullCard.tsx";
import PreviewCard from "../Components/cards/PreviewCard.tsx";
interface UserData {
    uid: String,
    username: String
    elo: Number
    profilePicture: String
}

function RecentGame() {
    return (
        <div style={{display: "inline-block", padding: 5, marginRight: 10, textAlign: "center", backgroundColor: "green"}}>
            <Image src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={50} width={50} />
            <h3 style={{margin: 20}}>W</h3>
            <h6>+14</h6>
        </div>
    )
}

function MostRecentGame() {
    return (
        <div style={{display: "inline-block", padding: 5, marginRight: 10, textAlign: "center", backgroundColor: "green"}}>
            <div>
                <PreviewCard height={"5em"} />
            </div>
            <div>
                <Image src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={50} width={50} />
                <h3 style={{margin: 20}}>W</h3>
                <h6>+14</h6>
            </div>
        </div>
    )
}

// import Stomp from 'stompjs';

export default function Profile() {

    const [data, setData] = useState<UserData>()
    const [imageData, setImageData] = useState<string | null>(null);


    useEffect(() => {
        getData()
    }, []);

    async function getData() {

        const idToken = await auth.currentUser?.getIdToken()

        await fetch("http://localhost:8080/user", {
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
                console.log("received data")
                console.log(data)
                setData(data)
            })
            .catch((e) => alert(e))
    }

    return (
        <div className={"d-flex m-5"}>
            <Container className={"mx-1"}>
                <Row className={"t"} style={{height: "25vh"}}>
                    <Col>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div>
                                <Image className={"py-2"} src={data ? data.profilePicture : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} height={225} width={225} />
                                <h3>{data?.username}</h3>
                            </div>
                            <div>
                                <div className={"d-flex mx-4"}>
                                    <div>
                                        <PreviewCard  height={"14em"}/>
                                        <h6 style={{textAlign: "center"}}>Most HP - 1273</h6>
                                    </div>
                                    <div>
                                        <PreviewCard height={"14em"}/>
                                        <h6 style={{textAlign: "center"}}>Most Damage - 349</h6>
                                    </div>
                                    <div>
                                        <PreviewCard height={"14em"}/>
                                        <h6 style={{textAlign: "center"}}>Highest Winrate - 89%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={"d-flex t mt-2"} style={{height: "20vh"}}>
                        <div className={"d-flex mt-2 align-items-center"}>
                            <div>
                                <Image src={"https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg"} height={100} />
                            </div>

                            <div className={"d-flex"}>
                                <div style={{marginLeft: 10, marginTop: 10, textAlign: "center"}}>
                                    <h6>Rank</h6>
                                    <h6>{data?.elo}</h6>
                                </div>
                            </div>

                            <div className={"d-flex mx-5 justify-content-center"} style={{width: "100%"}}>
                                {[0,0,0,0,0,0,0,0,0,0,0].map(() => {
                                    return <RecentGame />
                                })}
                            </div>
                        </div>
                    </Col>

                </Row>

                <Row className={"my-2"}>
                    <Col className={"t"} style={{height: "43vh", overflowY: "auto"}}>
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
                    <Col className={"t ml-1 p-2"}>
                        <h3>Cards</h3>
                        <div className={"d-flex flex-wrap justify-content-center"} style={{ height: "85vh", overflowY: "auto" }}>
                            {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(() => {
                                return (
                                    <div className={"m-2"} >
                                        <PreviewCard height={"12em"}/>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}