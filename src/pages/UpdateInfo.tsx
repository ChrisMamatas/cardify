import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css"
import {Image} from "react-bootstrap";

export default function UpdateInfo() {

    const { state } = useLocation()
    const [newImage, setNewImage] = useState()

    function imageChange(e: React.FormEvent) {
        console.log(e.target)
        // setNewImage(e.target)
    }


    return (
        <div style={{display: "flex", flexDirection: "row", height: "80vh", justifyContent: "center", alignItems: "center"}}>

            <Image src={state.image} style={{height: 200, width: 200}} />
            <input type={"file"} accept={"image/*"} onChange={imageChange} />

        </div>
    )
}