import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap'; // Assuming you are using React Bootstrap

type Game = {
    win: boolean;
    opponentProfilePic: string;
    // other properties of the game
};

type RecentGameProps = {
    recentBattles: Game[];
};

const RecentGame: React.FC<RecentGameProps> = ({ recentBattles }) => {

    return (
        <Container>
            <Col>
                <h1>Recent Games</h1>
            </Col>
            <Col id="gamesContainer" style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
                {recentBattles.splice(0, 6).map((game, index) => (
                    <div key={index} style={{ display: "inline-block", padding: 5, marginRight: 10, textAlign: "center", backgroundColor: game.win ? "green" : "red" }}>
                        <img src={game.opponentProfilePic} alt="Game Thumbnail" height={50} width={50} />
                        <h3 style={{ margin: 20 }}>{game.win ? "Win" : "Loss"}</h3>
                    </div>
                ))}
            </Col>
        </Container>
    );
};

export default RecentGame;
