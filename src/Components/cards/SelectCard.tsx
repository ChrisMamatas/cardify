import "../../@types/card.ts"
import Image from "react-bootstrap/Image"
import React from "react";
import "./SelectCard.css"

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

interface SelectCardProps {
    card: Card;
}

const SelectCard: React.FC<SelectCardProps> = ({ card}) => {

    return (
        <div>
            <Image src={"data:image/png;base64, " + card.frontCard} style={{height: 400}} />
        </div>
    )
}

export default SelectCard