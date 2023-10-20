import React, { useState } from "react"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig.ts";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (password !== password2) {
            alert("Passwords do not match")
            return
        }

        alert("after")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => alert(error))

    }

    return (
        <div className={"d-flex flex-grow-1 justify-content-center align-items-center"} style={{height: "100vh"}}>

            <Form onSubmit={handleSubmit}>
                <div className={"text-center"}>
                    <Image src={"https://assetsio.reedpopcdn.com/hearthstone_ashes_of_outland_3.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"} height={300} />

                    <h3 className={"mt-1 mb-5"}>Cardify</h3>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
                        <Form.Control type="password" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)}/>
                    </FloatingLabel>

                    <button type={"submit"} className={"w-100 p-2 my-3"}>Login</button>
                    <Link to={"/forgot"}><p>Forgot Password?</p></Link>

                    <p className={"my-5"}>Already have an account? <Link to={"/"}><button type={"button"}>Log In</button></Link></p>
                </div>

            </Form>

        </div>
    )
}