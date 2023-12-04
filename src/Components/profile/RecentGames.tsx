import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap'; // Assuming you are using React Bootstrap


type RecentGameProps = {
    recentBattles: RecentBattle[];
};

const RecentGame: React.FC<RecentGameProps> = ({ recentBattles }) => {

    return (
        <Container>
            <Col>
                <h1>Recent Games</h1>
            </Col>
            <Col id="gamesContainer" style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
                {recentBattles.slice(0, 4).map((game, index) => (
                    <div key={index} style={{ display: "inline-block", padding: 5, width: 150, marginRight: 10, textAlign: "center", backgroundColor: game.win ? "green" : "red" }}>
                        <img src={game.opponentProfilePic} alt="Game Thumbnail" height={50} width={50} />
                        <h3 style={{ overflow: "hidden", fontSize: "18px", padding: ".5em", textOverflow: "ellipsis" }}>{game.opponentUserName}</h3>
                        <h3 style={{ margin: 20 }}>{game.win ? "Win" : "Loss"}</h3>
                    </div>
                ))}
            </Col>
        </Container>
    );
};

export default RecentGame;
