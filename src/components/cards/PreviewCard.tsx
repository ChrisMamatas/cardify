import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import cardStyles from "./PreviewCard.module.css"
import FullCard from './FullCard';

interface PreviewProps {
    cardName?: string;
    imageUrl?: string;
    onButtonClick?: () => void;
}


const PreviewCard: React.FC<PreviewProps> = ({
    cardName,
    imageUrl,
    onButtonClick

}) => {
    const [showComponent, setShowComponent] = useState(false);
    return (
        <div>
            <Card className={cardStyles.card} onClick={() => { setShowComponent(true) }}>
                <Card.Img variant="top" src={imageUrl ? imageUrl : "src/assets/DefaultCard/Image.jpg"} />
                <Card.ImgOverlay className={cardStyles["overlay-content"] + " align-middle"}>
                    <h1>{cardName ? cardName : "DefaultCard"}</h1>
                </Card.ImgOverlay>
            </Card>
            {showComponent ? <FullCard onClickOff={() => setShowComponent(false)} /> : null}
        </div>

    );
};


export default PreviewCard;