import React, { useState } from "react"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from 'react-bootstrap/Form';
import { browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig.ts";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { connectWebSocket } from "../services/WebsocketService.ts";
import { useToast } from "../components/toasts/ToastContext.tsx";

export default function Login() {

    const { addBattleRequestToast } = useToast();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        auth.setPersistence(browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        navigate("/")
                        connectWebSocket(await userCredential.user.getIdToken(), addBattleRequestToast)
                    })
                    .catch((error) => alert(error))
            })


    }


    return (
        <div className={"d-flex flex-grow-1 justify-content-center align-items-center"} style={{ height: "100vh" }}>

            <Form onSubmit={handleSubmit}>
                <div className={"text-center"}>
                    <Image src={"https://assetsio.reedpopcdn.com/hearthstone_ashes_of_outland_3.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"} height={300} />

                    <h3 className={"mt-1 mb-5"}>Cardify</h3>
                    <FloatingLabel label="Email" className="mb-3 p-0">
                        <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" >
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>

                    <button type={"submit"} className={"w-100 p-2 my-3"}>Login</button>
                    <Link to={"/forgot"}><p>Forgot Password?</p></Link>

                    <p className={"my-5"}>Need an account? <Link to={"/register"}><button type={"button"}>Sign Up</button></Link></p>
                </div>

            </Form>

        </div>
    )
}