import React, { useState } from "react"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig.ts";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (password !== password2) {
            setErrorMessage("Passwords are not the same.")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async() => {
                const idToken = await auth.currentUser?.getIdToken()
                fetch("http://localhost:8080/user", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + idToken
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        navigate("/")
                    }
                    else {
                        throw new Error()
                    }
                })
                .catch((e) => alert(e))
            })
            .catch((error) => {
                if (error.code == "auth/email-already-in-use")
                    setErrorMessage("Email already in use.")
            })

    }

    return (
        <div className={"d-flex flex-grow-1 justify-content-center align-items-center"} style={{height: "100vh"}}>

            <Form onSubmit={handleSubmit}>
                <div className={"text-center"}>
                    <Image src={"https://assetsio.reedpopcdn.com/hearthstone_ashes_of_outland_3.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"} height={300} />

                    <h3 className={"mt-1 mb-5"}>Cardify</h3>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control required={true} type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                        <Form.Control required={true} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
                        <Form.Control required={true} type="password" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)}/>
                    </FloatingLabel>

                    <div>
                        <p style={{color: "red"}}>{errorMessage}</p>
                    </div>

                    <button type={"submit"} className={"w-100 p-2 my-3"}>Sign Up</button>
                    <Link to={"/forgot"}><p>Forgot Password?</p></Link>

                    <p className={"my-5"}>Already have an account? <Link to={"/login"}><button type={"button"}>Log In</button></Link></p>
                </div>

            </Form>

        </div>
    )
}