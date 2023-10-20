import React, {useContext, useState} from "react"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig.ts";
import { Link, redirect } from "react-router-dom";
import {Image} from "react-bootstrap";
import {AuthContext} from "../utils/Auth.tsx";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch((error) => alert(error))

    }

    const { currentUser }: any = useContext(AuthContext)

    if (currentUser) {
        return redirect("/")
    }

    return (
        <div className={"d-flex flex-grow-1 justify-content-center align-items-center"} style={{height: "100vh"}}>

            <Form onSubmit={handleSubmit}>
                <div className={"text-center"}>
                    <Image src={"https://assetsio.reedpopcdn.com/hearthstone_ashes_of_outland_3.png?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"} height={300} />

                    <h3 className={"mt-1 mb-5"}>Cardify</h3>
                    <FloatingLabel label="Email" className="mb-3 p-0">
                        <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" >
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </FloatingLabel>

                    <button type={"submit"} className={"w-100 p-2 my-3"}>Login</button>
                    <Link to={"/forgot"}><p>Forgot Password?</p></Link>

                    <p className={"my-5"}>Need an account? <Link to={"/register"}><button type={"button"}>Sign Up</button></Link></p>
                </div>

            </Form>

        </div>
    )
}