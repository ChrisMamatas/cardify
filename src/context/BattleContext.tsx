import { subscribe, unsubscribe } from '../services/WebsocketService'
import { Message } from 'webstomp-client';
import { BattleContextType, IBattleSession } from '../@types/battleSession';
import { FC, PropsWithChildren, ReactNode, createContext, useContext, useEffect, useState } from 'react';



// Create a context for the battle session
const BattleContext = createContext<BattleContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const BattleProvider: FC<Props> = ({ children }) => {
    const [battleSession, saveBattleSession] = useState<IBattleSession | null>(null);
    const [subscriptionsCount, setSubscriptionsCount] = useState<{ [key: string]: number }>({});
    // Other state as needed, e.g., topic subscriptions, battle state

    // Function to subscribe to a topic
    const subscribeToBattleTopic = (topic: string) => {
        subscribe(topic, handleBattleMessage);
        // Increment subscription count
        setSubscriptionsCount(prev => ({ ...prev, [topic]: (prev[topic] || 0) + 1 }));
    };

    // Function to unsubscribe from a topic
    const unsubscribeFromBattleTopic = (topic: string) => {
        const count = subscriptionsCount[topic] || 0;
        if (count > 1) {
            // Decrement if more than one subscription exists
            setSubscriptionsCount(prev => ({ ...prev, [topic]: prev[topic] - 1 }));
        } else if (count === 1) {
            // Unsubscribe if this is the last subscription
            unsubscribe(topic);
            setSubscriptionsCount(prev => ({ ...prev, [topic]: 0 }));
        }
    };

    const handleBattleMessage = (battleSessionMessage: Message) => {
        try {
            saveBattleSession(JSON.parse(battleSessionMessage.body));

        } catch (error) {
            console.error('Error parsing battle request message:', error);
        }
    }


    return (
        <BattleContext.Provider value={{ battleSession, saveBattleSession, subscribeToBattleTopic, unsubscribeFromBattleTopic }}>
            {children}
        </BattleContext.Provider>
    );
};

// Custom hook to use the BattleContext
export const useBattle = () => {
    return useContext(BattleContext);
};
