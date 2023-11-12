import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import cardStyles from "./PreviewCard.module.css"
import FullCard from './FullCard';

interface PreviewProps {
    height?: string;
    cardName: string;
    baseImage: string;
    frontCard: string;
    backCard: string;
    onButtonClick?: () => void;
}


const PreviewCard: React.FC<PreviewProps> = ({
    height,
    cardName,
    baseImage,
    frontCard,
    backCard,
    onButtonClick

}) => {
    const [showComponent, setShowComponent] = useState(false);
    return (
        <div style={{ width: 'auto' }}>
            <Card className={cardStyles.card} style={{ height: height }} onClick={() => { setShowComponent(true) }}>
                <Card.Img variant="top" src={baseImage} />
                <Card.ImgOverlay className={cardStyles["overlay-content"] + " align-middle"}>
                    <h1>{cardName ? cardName : "Default Card"}</h1>
                </Card.ImgOverlay>
            </Card>
            {showComponent ? <FullCard onClickOff={() => setShowComponent(false)} frontCard={'data:image/png;base64, ' + frontCard} backCard={'data:image/png;base64, ' + backCard} /> : null}
        </div>

    );
};


export default PreviewCard;