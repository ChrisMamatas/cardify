// src/CardBox.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    width?: string;
}

<<<<<<< HEAD
=======

>>>>>>> b7c7cdcde62f9e7867c8e7894390b06ce3f9b0b8
const CardComponent: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    buttonText,
    onButtonClick,
    width
}) => {
    return (
<<<<<<< HEAD
        <Card style={{width: width ? width : "18em", margin: 1 }}>
            <Card.Img variant="top" src={imageUrl ? imageUrl : "https://via.placeholder.com/150"} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                {/*{buttonText && (*/}
                {/*    <Button variant="primary" onClick={onButtonClick}>*/}
                {/*        {buttonText}*/}
                {/*    </Button>*/}
                {/*)}*/}
            </Card.Body>
        </Card>
=======
        <div>

            <Card style={{ width: '18rem', margin: '16px' }}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    {buttonText && (
                        <Button variant="primary" onClick={onButtonClick}>
                            {buttonText}
                        </Button>
                    )}
                </Card.Body>
            </Card>


        </div>
>>>>>>> b7c7cdcde62f9e7867c8e7894390b06ce3f9b0b8
    );
};


export default CardComponent;
