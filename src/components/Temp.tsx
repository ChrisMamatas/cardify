import { Link } from 'react-router-dom';
import { useState } from "react";
import './Temp.css';

const chats = [
    {
        username: "user1",
        messages: [
            {
                content: "How are you",
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
    },
    {
        username: "user2",
        messages: [
            {
                content: "How are you guy 2",
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
                <p style={{padding: "0.5em", justifyItems: "", marginBottom: "0.5em", backgroundColor: "var(--secondary)", borderRadius: "90px"}}>
                    You: {message.content}
                </p>
            </div>
        )
    }

}

export default function Temp() {
    return (
        <div className={"Widget d-flex flex-column"}>

            <div className={"header justify-content-start"}>
                <h5>Feed</h5>
                <h5>Chat</h5>
            </div>
            <div className={"d-flex flex-column flex-grow-1 justify-content-end"}>
                {
                    chats[0].messages.map((msg) => (
                        <ChatMessage message={msg} />
                    ))
                }
            </div>
            <div className={"d-flex flex-direction-row gap-1 justify-content-end"}>
                <input type={"text"} placeholder={"Type here"} style={{paddingRight: "6%"}} className={"w-100"}/>
                <button style={{ position: "absolute", borderRadius: "45%", fontSize: "80%", marginTop: "0.2em", marginRight: "0.2em", opacity: "70%"}}>
                    Send
                </button>
            </div>
        </div>
    );
}
