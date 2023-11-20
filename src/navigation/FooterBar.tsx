import Navbar from "react-bootstrap/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {auth} from "../../firebaseConfig.ts";
import Profile from "../pages/Profile.tsx";

interface Profile {
    username: string,
    profilePicture: string,
    elo: number,
    uid: string
}
export default function FooterBar() {

    const [profileData, setProfileData] = useState<Profile>()

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetch("http://localhost:8080/user", {
                    headers: {
                        "Authorization": "Bearer " + (await auth.currentUser?.getIdToken()),
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error();
                        }
                    })
                    .then((data) => {
                        setProfileData(data)
                    })
                    .catch((e) => console.log(e));
            }
        });
    }

    return (
        <Navbar>
            <div className="d-flex" style={{ marginLeft: "5rem", justifyContent: "space-between", width: "90%" }}>
                <Navbar.Text>
                    <h5>Signed in as:</h5>
                    {
                        profileData?.username
                    }
                </Navbar.Text>
                <Navbar.Text>
                    <h5>$balance</h5>
                </Navbar.Text>
            </div>
        </Navbar>
    )
}