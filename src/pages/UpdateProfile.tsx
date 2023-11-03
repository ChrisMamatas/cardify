import { useState, useEffect } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";

export default function UpdateProfile() {
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png");

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "red", height: "100vh" }}>
            <Form.Group className="d-flex flex-column justify-content-center align-items-center w-25" style={{gap: 10}}>
                <Form.Label style={{fontSize: 36}}>Avatar</Form.Label>
                <Image src={image} style={{ height: 200, width: "auto" }} />
                <Form.Control type="file" placeholder="Select Image" />
                <Form.FloatingLabel label="Username">
                    <Form.Control type="text" placeholder="Username" />
                </Form.FloatingLabel>
            </Form.Group>
        </div>
    );
}
