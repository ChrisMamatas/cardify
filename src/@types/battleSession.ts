import { Message } from "webstomp-client";

export interface IBattleSession {
    id: string
    players: [{
        playerId: string,
        playerUserName: string,
        ready: boolean,
        acknowledged: boolean,
        confirmed: boolean
    }]

}

export type BattleContextType = {
    battleSession: IBattleSession | null;
    saveBattleSession: React.Dispatch<React.SetStateAction<IBattleSession | null>>;
    subscribeToBattleTopic: (topic: string) => void;
    unsubscribeFromBattleTopic: (id: string) => void;
}