import React, { useState } from 'react';
import './UpdateInfo.css'
import { auth } from '../../firebaseConfig';
import { Button, Col, Form, Row } from 'react-bootstrap';


function UpdateInfo() {
    const [profilePic, setProfilePic] = useState('');
    const [username, setUsername] = useState('');
    const apiDomain = 'http://localhost:8080/user';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = (event.target!.result as string);
                setProfilePic(base64String);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let user = auth.currentUser;
        let token = await user?.getIdToken();
        let request = {
            username: username,
            image: profilePic
        }
        console.log(request);

        try {
            const response = await fetch(apiDomain, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(request)
            });
            console.log(response);


            // Handle response as necessary, e.g., redirecting or showing a message
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="update-form">


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3 label profile-pic-container">
                    <Form.Label column md="4">Profile Picture: </Form.Label>
                    {profilePic && <img
                        src={profilePic}

                        className="profile-pic"
                    />}
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Form.Group as={Row} className="mb-3 label" controlId="formPlaintext">
                    <Form.Label column md="4">
                        Username:
                    </Form.Label>
                    <Col md="8">
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Description" />
                    </Col>
                </Form.Group>


                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default UpdateInfo;
