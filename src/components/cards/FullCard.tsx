// src/CardBox.tsx
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import cardStyles from "./FullCard.module.css"

interface CardProps {

    onClickOff: () => void;
    imageUrl?: string;
    onButtonClick?: () => void;

}


const CardComponent: React.FC<CardProps> = ({
    onClickOff,
    imageUrl,

}) => {
    const [flip, setFlip] = useState(false);
    return (

        <div className={cardStyles["card-container"]} onClick={(event) => {
            if (event.target === event.currentTarget) {
                onClickOff();
            }
        }
        }>
            <div className={`${cardStyles.card} ${flip ? cardStyles.flip : ''}`} >
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

        </div>

    );
};


export default CardComponent;
