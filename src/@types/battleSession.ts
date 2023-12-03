
export interface IBattleSession {
    id: string;
    confirmed: boolean;
    battleGenerated: boolean;
    players: [{
        playerId: string,
        playerUserName: string,
        ready: boolean,
        acknowledged: boolean,
        confirmed: boolean
        selectedCardIds: string[]
    }]

}

export type BattleContextType = {
    battleSession: IBattleSession | null;
    saveBattleSession: React.Dispatch<React.SetStateAction<IBattleSession | null>>;
    subscribeToBattleTopic: (topic: string) => void;
    unsubscribeFromBattleTopic: (id: string) => void;
}

// types/WebSocketTypes.ts
export interface BattleRequestMessage {
    message: string;
    senderUid: string;
    senderUsername: string;
    battleSessionId: string;
}

export interface BattleSetupMessage {
    battleSessionId: string;
}