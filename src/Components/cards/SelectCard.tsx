import "../../@types/card.ts"
import Image from "react-bootstrap/Image"
import React from "react";
import "./SelectCard.css"
import { Card } from 'react-bootstrap';
import cardStyles from "./PreviewCard.module.css";

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
        attack: number;
        criticalChance: number;
        health: number;
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
    height?: string;
    currHealth?: number
}

export const SelectCard: React.FC<SelectCardProps> = ({ card, height}) => {

    return (
        <div>
            <Image src={"data:image/png;base64, " + card.frontCard} style={{height: height}} />
        </div>
    )
}

export const BattleCard: React.FC<SelectCardProps> = ({ card, height, currHealth }) => {

    return (
        <div style={{ width: 'auto' }}>
            <Card className={cardStyles.card} style={{ height: height }} >
                <Card.Img variant="top" src={card.baseImage} />
            </Card>

            <div className={"stats"}>
                <Card className={"attack"}>
                    <p className={"text"}>{card.cardAttributes.stats.attack}</p>
                </Card>
                <Card className={"health"}>
                    <p className={"text"}>{currHealth ? currHealth : card.cardAttributes.stats.health}</p>
                </Card>
            </div>

        </div>
    )
}
