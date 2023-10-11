import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./CreateCard.css"

export default function CreateCard() {
    return (
        <Container style={{ marginTop: "32px" }} >
            <Row md="12" >
                <Col md="12">

                    <Form>
                        <Form.Group as={Row} className="mb-3 label" controlId="formPlaintextEmail">
                            <Form.Label column md="2">
                                Name
                            </Form.Label>
                            <Col md="10">
                                <Form.Control type='' defaultValue="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 label" controlId="formPlaintextPassword">
                            <Form.Label column md="2">
                                Description
                            </Form.Label>
                            <Col md="10">
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3 label">
                            <Form.Label column md="2">Picture</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
            <div style={{ marginTop: "4em" }}>
                <h4 className='label'>Preview</h4>
                <Row md="6" style={{ marginTop: "4em" }}>
                    <Col md="4">

                    </Col>
                    <Col md="4" style={{ backgroundColor: "light-gray", height: "40em", borderRadius: "50px" }}>

                    </Col>
                    <Col md="4">

                    </Col>
                </Row>
            </div>

        </Container >
    );
}
