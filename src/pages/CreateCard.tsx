import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./CreateCard.css"
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';

export default function CreateCard() {
    // const apiDomain = process.env.REACT_APP_Cardify_API || '';
    const apiDomain = 'http://localhost:8080/card';
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [card, displayCard] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = (event.target!.result as string).split(",")[1];
                setFile(base64String);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let user = auth.currentUser;
        let token = await user?.getIdToken();
        let request = {
            name: name,
            image: file
        }
        console.log(request);

        try {
            const response = await fetch(apiDomain, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(request)
            });

            const data = await response.json();
            console.log(data);
            displayCard(data.image);

            // Handle response as necessary, e.g., redirecting or showing a message
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <Container style={{ marginTop: "32px" }} >
            <Row md="12" >
                <Col md="12">

                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3 label" controlId="formPlaintextEmail">
                            <Form.Label column md="2">
                                Name
                            </Form.Label>
                            <Col md="10">
                                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 label" controlId="formPlaintext">
                            <Form.Label column md="2">
                                Description
                            </Form.Label>
                            <Col md="10">
                                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3 label">
                            <Form.Label column md="2">Picture</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row md="12" >
                {card && <img src={`data:image/png;base64,${card}`} alt="Received" style={{ height: "500px", width: "300px" }} />}            </Row>

        </Container >
    );
}
