// src/CardBox.tsx
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import cardStyles from "./FullCard.module.css"

interface CardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    width?: string;
}


const CardComponent: React.FC<CardProps> = ({
    imageUrl,

}) => {
    const [flip, setFlip] = useState(false);
    return (
        <div className={`${cardStyles.card} ${flip ? cardStyles.flip : ''}`}>
            <div className={cardStyles.front} onClick={() => setFlip(!flip)}>
                <Card >
                    <Card.Img variant="top" src={imageUrl ? imageUrl : "src/assets/DefaultCard/Front.png"} />
                </Card>
            </div>
            <div className={cardStyles.back} onClick={() => setFlip(!flip)}>
                <Card >
                    <Card.Img variant="top" src={imageUrl ? imageUrl : "src/assets/DefaultCard/Back.png"} />
                </Card>
            </div>
        </div>

    );
};


export default CardComponent;
