// src/CardBox.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    buttonText?: string;
    onButtonClick?: () => void;
}


const CardComponent: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
    buttonText,
    onButtonClick,
}) => {
    return (
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
    );
};


export default CardComponent;
