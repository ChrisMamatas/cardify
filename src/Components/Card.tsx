// src/CardBox.tsx
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import "./Card.css"

interface CardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    width?: string;
}


const CardComponent: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    buttonText,
    onButtonClick,
    width
}) => {
    const [flip, setFlip] = useState(false);
    return (
        <div className={`card ${flip ? "flip" : ""}`}>
            <div className="front" onClick={() => setFlip(!flip)}>
                <Card >
                    <Card.Img variant="top" src={imageUrl ? imageUrl : "src/assets/DefaultCard/Front.png"} />
                </Card>
            </div>
            <div className='back' onClick={() => setFlip(!flip)}>
                <Card >
                    <Card.Img variant="top" src={imageUrl ? imageUrl : "src/assets/DefaultCard/Back.png"} />
                </Card>
            </div>
        </div>

    );
};


export default CardComponent;
