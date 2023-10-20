import { Link } from 'react-router-dom';
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Temp.css';

const chats = [
    {
        username: "user1",
        messages: [
            {
                content: "This the Timeline",
                type: "received"
            },
            {
                content: "Cool!",
                type: "sent"
            },
            {
                content: "I know",
                type: "received"
            },
        ]
    },
    {
        username: "user2",
        messages: [
            {
                content: "Hello this is user 2",
                type: "received"
            },
            {
                content: "Good! Want to play",
                type: "sent"
            },
            {
                content: "Lets do this.",
                type: "received"
            },
        ]
    }
]

interface Message {
    message: object,
    content: string,
    type: string
}

function ChatMessage({ message } : Message) {
    if (message.type === "received") {
        return (
            <div>
                <p style={{padding: "0.5em", marginBottom: "0.5em", display: "inline-block", backgroundColor: "var(--accent)", borderRadius: "90px"}}>
                    User1: {message.content}
                </p>
            </div>
        )
    }
    else {
        return (
            <div style={{display: "grid"}}>
                <p style={{padding: "0.5em", justifySelf: "end", marginBottom: "0.5em", backgroundColor: "var(--secondary)", borderRadius: "90px"}}>
                    You: {message.content}
                </p>
            </div>
        )
    }
}
export default function Temp() {
    return (
        <div className={"Widget d-flex flex-column"}>
            <Tabs justify style={{backgroundColor: "var(--primary)"}}>
                <Tab eventKey="Timeline" title="TimeLine" style={{backgroundColor: "var(--primary)"}}>
                    <div className={"d-flex flex-column flex-grow-1 justify-content-end"} style={{backgroundColor: "var(--primary)", height: "25rem"}}>
                        {
                            chats[0].messages.map((msg) => (
                                <ChatMessage message={msg} />
                            ))
                        }
                    </div>
                </Tab>

                <Tab eventKey="Chat1" title="Chat1" style={{backgroundColor: "var(--accent)"}}>
                    <div className={"d-flex flex-column flex-grow-1 justify-content-end"} style={{backgroundColor: "var(--primary)", height: "25rem"}}>
                        {
                            chats[0].messages.map((msg) => (
                                <ChatMessage message={msg} />
                            ))
                        }
                    </div>
                </Tab>

                <Tab eventKey="Chat2" title="Chat2" style={{backgroundColor: "var(--accent)"}}>
                    <div className={"d-flex flex-column flex-grow-1 justify-content-end"} style={{backgroundColor: "var(--primary)", height: "25rem"}}>
                        {
                            chats[0].messages.map((msg) => (
                                <ChatMessage message={msg} />
                            ))
                        }
                    </div>
                </Tab>
            </Tabs>


            <div className={"d-flex flex-direction-row gap-1 justify-content-end"}>
                <input type={"text"} placeholder={"Type here"} style={{paddingRight: "6%"}} className={"w-100"}/>
                <button style={{ position: "absolute", borderRadius: "45%", fontSize: "80%", marginTop: "0.2em", marginRight: "0.2em", opacity: "70%"}}>
                    Send
                </button>
            </div>
        </div>
    );
}
