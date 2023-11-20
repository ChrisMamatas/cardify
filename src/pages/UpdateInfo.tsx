import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css"
import {Image} from "react-bootstrap";

export default function UpdateInfo() {

    const { state } = useLocation()
    const [newImage, setNewImage] = useState()

    function imageChange() {
        // console.log(e.target.files[0])
        // setNewImage(e.target)
    }


    return (
        <div>

            <Image src={state.image} style={{height: 200, width: 200}} />
            <input type={"image"} accept={"image/*"} onChange={imageChange} />

        </div>
    )
}