import {ChangeEvent, useEffect, useState} from "react";
import { auth } from "../../firebaseConfig.ts"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import {Col, Container, Row, Modal, Button} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Cropper, {Area} from 'react-easy-crop'
import getCroppedImg from "../utils/cropImage.tsx";

const CROP_AREA_ASPECT = 8 / 5;

interface ProfileData {
    username: string
    profilePicture: string,
    elo: number,
    showcase: string[]
}

export default function PostRegister() {

    const [data, setData] = useState<ProfileData>()
    const [newUsername, setNewUsername] = useState<string>()

    const [imageOne, setImageOne] = useState<string | null>(null)
    const [imageTwo, setImageTwo] = useState<string | null>(null)
    const [imageThree, setImageThree] = useState<string | null>(null)
    const [imageFour, setImageFour] = useState<string | null>(null)

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const [croppedImageOne, setCroppedImageOne] = useState(null)
    const [croppedImageTwo, setCroppedImageTwo] = useState(null)
    const [croppedImageThree, setCroppedImageThree] = useState(null)
    const [croppedImageFour, setCroppedImageFour] = useState(null)

    const [modalShown, setModalShown] = useState(false)
    const [modalImage, setModalImage] = useState<string>("")

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idToken = await user.getIdToken()

                await fetch("http://localhost:8080/user", {
                    headers: {
                        "Authorization": "Bearer " + idToken
                    }
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error()
                    })
                    .then((d) => {
                        setData(d)
                        setNewUsername(d.username)
                    })
                    .catch((e) => console.log(e))
            }
        })
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, setImage:any, whichImage:string) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage))
            setModalImage(whichImage)
            setModalShown(true)
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        console.log(croppedArea, "and", croppedAreaPixels);
        setCroppedAreaPixels(croppedAreaPixels)
    };

    const saveCroppedImage = async () => {

        // Close the modal
        setModalShown(false)
        try {
            console.log("modal image is + ", modalImage)
            const croppedImage: any = await getCroppedImg(
                modalImage === "imageOne" ? imageOne : modalImage === "imageTwo" ? imageTwo : modalImage === "imageThree" ? imageThree : imageFour,
                croppedAreaPixels,
            )
            console.log('donee', { croppedImage })
            if (modalImage === "imageOne") {
                setCroppedImageOne(croppedImage)
            }
            else if (modalImage === "imageTwo") {
                setCroppedImageTwo(croppedImage)
            }
            else if (modalImage === "imageThree") {
                setCroppedImageThree(croppedImage)
            }
            else if (modalImage === "imageFour") {
                setCroppedImageFour(croppedImage)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function createCards() {
        console.log("create these")
    }

    return (
        <div style={{backgroundColor: "red", height: "100vh"}} className={"d-flex flex-row justify-content-center align-items-center"}>

            <Modal show={modalShown} onHide={() => setModalShown(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Size Your Image</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height: "60vh"}}>
                    <div className={"cropper"}>
                        <Cropper
                            image={modalImage === "imageOne" ? imageOne : modalImage === "imageTwo" ? imageTwo : modalImage === "imageThree" ? imageThree : imageFour}
                            crop={crop}
                            zoom={zoom}
                            aspect={CROP_AREA_ASPECT}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onCropAreaChange={setCroppedArea}
                            onZoomChange={setZoom}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveCroppedImage}>Save</Button>

                </Modal.Footer>
            </Modal>



            <Container>
                <Row>
                    <h3 style={{textAlign: "center", marginBottom: "10vh"}}>Create Your First Cards</h3>
                </Row>
                <Row>
                    <Col>
                        <div style={{height: 200, width: 300, backgroundColor: "gray", marginBottom: 10}}>
                            <Image src={croppedImageOne} height={200} width={300}/>
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageOne, "imageOne")}/>

                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 200, width: 300, backgroundColor: "gray", marginBottom: 10}}>
                            <Image src={croppedImageTwo} height={200} width={300}/>
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageTwo, "imageTwo")}/>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 200, width: 300, backgroundColor: "gray", marginBottom: 10}}>
                            <Image src={croppedImageThree} height={200} width={300}/>
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageThree, "imageThree")}/>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <div style={{height: 200, width: 300, backgroundColor: "gray", marginBottom: 10}}>
                            <Image src={croppedImageFour} height={200} width={300}/>
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageFour, "imageFour")}/>
                        <FloatingLabel controlId="floatingInput" label={"Name"} placeholder={"Name"}>
                            <Form.Control placeholder={"Name"} type={"text"}></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <button onClick={createCards}>Create</button>
                </Row>
            </Container>

        </div>
    )
}