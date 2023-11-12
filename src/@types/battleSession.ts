import { Message } from "webstomp-client";

export interface IBattleSession {
    id: string
    players: [{
        playerId: string,
        ready: boolean,
        acknowledge: boolean,
        confirmed: boolean
    }]

}

export type BattleContextType = {
    battleSession: IBattleSession | null;
    saveBattleSession: React.Dispatch<React.SetStateAction<IBattleSession | null>>;
    subscribeToBattleTopic: (topic: string, callback: (message: Message) => any) => void;
    unsubscribeFromBattleTopic: (id: string) => void;
}