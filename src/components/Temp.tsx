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
            <p>User1: {message.content}</p>
        )
    }
    else {
        return (
            <p>You: {message.content}</p>
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
            <div className={"d-flex flex-column justify-content-end"}>
                <input type={"text"} placeholder={"Type here"}/>
                <button style={{paddingInline:"1%", marginBottom: "0.2em", left: "87%", position: "absolute", borderRadius: "45%", fontSize: "80%"}}>
                    Send
                </button>
            </div>
        </div>
    );
}
