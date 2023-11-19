import { ChangeEvent, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig.ts"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import { Col, Container, Row, Modal, Button, InputGroup } from "react-bootstrap";
import Cropper, { Area } from 'react-easy-crop'
import getCroppedImg from "../utils/cropImage.tsx";
import PreviewCard from "../Components/cards/PreviewCard.tsx";
import { useNavigate } from "react-router-dom";

const CROP_AREA_ASPECT = 8 / 5;

interface ProfileData {
    username: string
    profilePicture: string,
    elo: number,
    showcase: string[]
}

interface CardAttributes {
    name: string;
    colors: {
        dominantHex: string;
        dominantRgb: {
            r: number;
            g: number;
            b: number;
        };
        accentHex: string;
        accentRgb: {
            r: number;
            g: number;
            b: number;
        };
    };
    stats: {
        lightAttack: number;
        heavyAttack: number;
        speed: number;
        defense: number;
    };
}
interface Card {
    baseImage: string;
    frontCard: string;
    backCard: string;
    cardId: string;
    cardAttributes: CardAttributes; // Correct the case to match the response
}

export default function PostRegister() {

    const navigate = useNavigate()

    const [data, setData] = useState<ProfileData>()
    const [newUsername, setNewUsername] = useState<string>()

    const [imageOne, setImageOne] = useState<string | null>(null)
    const [imageTwo, setImageTwo] = useState<string | null>(null)
    const [imageThree, setImageThree] = useState<string | null>(null)
    const [imageFour, setImageFour] = useState<string | null>(null)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const [croppedImageOne, setCroppedImageOne] = useState(null)
    const [croppedImageTwo, setCroppedImageTwo] = useState(null)
    const [croppedImageThree, setCroppedImageThree] = useState(null)
    const [croppedImageFour, setCroppedImageFour] = useState(null)

    const [titleOne, setTitleOne] = useState<string | null>(null)
    const [titleTwo, setTitleTwo] = useState<string | null>(null)
    const [titleThree, setTitleThree] = useState<string | null>(null)
    const [titleFour, setTitleFour] = useState<string | null>(null)
    const [descriptionOne, setDescriptionOne] = useState<string | null>(null)
    const [descriptionTwo, setDescriptionTwo] = useState<string | null>(null)
    const [descriptionThree, setDescriptionThree] = useState<string | null>(null)
    const [descriptionFour, setDescriptionFour] = useState<string | null>(null)

    const [createdCardOne, setCreatedCardOne] = useState<Card>()
    const [createdCardTwo, setCreatedCardTwo] = useState<Card>()
    const [createdCardThree, setCreatedCardThree] = useState<Card>()
    const [createdCardFour, setCreatedCardFour] = useState<Card>()

    const [modalShown, setModalShown] = useState<boolean>(false)
    const [modalImage, setModalImage] = useState<string>("")

    const [confirmModalShown, setConfirmModalShown] = useState<boolean>(false)

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

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, setImage: any, whichImage: string) => {
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

        setConfirmModalShown(true)

        const idToken = await auth.currentUser?.getIdToken()

        // Make first card
        await fetch("http://localhost:8080/card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + idToken
            },
            body: JSON.stringify({
                name: titleOne,
                description: descriptionOne,
                image: croppedImageOne
            })
        })
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error()
            })
            .then((data) => {
                setCreatedCardOne(data)
            })
            .catch((e) => alert(e))

        // Make second card
        await fetch("http://localhost:8080/card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + idToken
            },
            body: JSON.stringify({
                name: titleTwo,
                description: descriptionTwo,
                image: croppedImageTwo
            })
        })
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error()
            })
            .then((data) => {
                setCreatedCardTwo(data)
            })
            .catch((e) => alert(e))

        // Make third card
        await fetch("http://localhost:8080/card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + idToken
            },
            body: JSON.stringify({
                name: titleThree,
                description: descriptionThree,
                image: croppedImageThree
            })
        })
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error()
            })
            .then((data) => {
                setCreatedCardThree(data)
            })
            .catch((e) => alert(e))

        // Make fourth card
        await fetch("http://localhost:8080/card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + idToken
            },
            body: JSON.stringify({
                name: titleFour,
                description: descriptionFour,
                image: croppedImageFour
            })
        })
            .then((response) => {
                if (response.ok) return response.json()
                throw new Error()
            })
            .then((data) => {
                setCreatedCardFour(data)
            })
            .catch((e) => alert(e))
    }

    return (
        <div style={{ height: "100vh" }} className={"d-flex flex-row justify-content-center align-items-center"}>

            <Modal show={modalShown} onHide={() => setModalShown(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Size Your Image</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "60vh" }}>
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

            <Modal show={confirmModalShown}>
                <Modal.Header>
                    <Modal.Title>Here Are Your Cards!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "60vh" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <PreviewCard
                            cardName={createdCardOne?.cardAttributes.name}
                            baseImage={createdCardOne?.baseImage}
                            frontCard={createdCardOne?.frontCard}
                            backCard={createdCardOne?.backCard} />
                        <PreviewCard
                            cardName={createdCardTwo?.cardAttributes.name}
                            baseImage={createdCardTwo?.baseImage}
                            frontCard={createdCardTwo?.frontCard}
                            backCard={createdCardTwo?.backCard} />
                        <PreviewCard
                            cardName={createdCardThree?.cardAttributes.name}
                            baseImage={createdCardThree?.baseImage}
                            frontCard={createdCardThree?.frontCard}
                            backCard={createdCardThree?.backCard} />
                        <PreviewCard
                            cardName={createdCardFour?.cardAttributes.name}
                            baseImage={createdCardFour?.baseImage}
                            frontCard={createdCardFour?.frontCard}
                            backCard={createdCardFour?.backCard} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => navigate("/")}>Lets Play!</Button>
                </Modal.Footer>
            </Modal>


            <Container>
                <Row>
                    <h3 style={{ textAlign: "center", marginBottom: "10vh" }}>Create Your First Cards</h3>
                </Row>
                <Row>
                    <Col>
                        <div style={{ height: 200, width: 300, backgroundColor: "gray", marginBottom: 10 }}>
                            <Image src={croppedImageOne} height={200} width={300} />
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageOne, "imageOne")} />

                        <Form.Control placeholder={"Title"} onChange={(e) => setTitleOne(e.target.value)} />
                        <Form.Control as={"textarea"} placeholder={"Description"} onChange={(e) => setDescriptionOne(e.target.value)} />
                    </Col>
                    <Col>
                        <div style={{ height: 200, width: 300, backgroundColor: "gray", marginBottom: 10 }}>
                            <Image src={croppedImageTwo} height={200} width={300} />
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageTwo, "imageTwo")} />
                        <Form.Control placeholder={"Title"} onChange={(e) => setTitleTwo(e.target.value)} />
                        <Form.Control as={"textarea"} placeholder={"Description"} onChange={(e) => setDescriptionTwo(e.target.value)} />
                    </Col>
                    <Col>
                        <div style={{ height: 200, width: 300, backgroundColor: "gray", marginBottom: 10 }}>
                            <Image src={croppedImageThree} height={200} width={300} />
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageThree, "imageThree")} />
                        <Form.Control placeholder={"Title"} onChange={(e) => setTitleThree(e.target.value)} />
                        <Form.Control as={"textarea"} placeholder={"Description"} onChange={(e) => setDescriptionThree(e.target.value)} />
                    </Col>
                    <Col>
                        <div style={{ height: 200, width: 300, backgroundColor: "gray", marginBottom: 10 }}>
                            <Image src={croppedImageFour} height={200} width={300} />
                        </div>
                        <input type="file" accept={"image/*"} onChange={(e) => handleFileUpload(e, setImageFour, "imageFour")} />
                        <Form.Control placeholder={"Title"} onChange={(e) => setTitleFour(e.target.value)} />
                        <Form.Control as={"textarea"} placeholder={"Description"} onChange={(e) => setDescriptionFour(e.target.value)} />
                    </Col>
                </Row>
                <Row className={"mt-5"}>
                    <button onClick={createCards}>Create</button>
                </Row>
            </Container>

        </div>
    )
}