import { Message } from 'webstomp-client';
import { BattleContextType, IBattleSession, BattleRequestMessage, BattleSetupMessage } from '../@types/battleSession';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { useWebSocket } from './WebSocketContext';



// Create a context for the battle session
const BattleContext = createContext<BattleContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const BattleProvider: FC<Props> = ({ children }) => {
    const [battleSession, saveBattleSession] = useState<IBattleSession | null>(null);
    const [subscriptionsCount, setSubscriptionsCount] = useState<{ [key: string]: number }>({});
    const { addBattleRequestToast } = useToast();
    const { subscribe, unsubscribe, sendWebSocketMessage } = useWebSocket();

    useEffect(() => {
        const battleRequestSubscription = subscribe('/user/queue/battle-requests', (battleRequestMessage: Message) => {
            try {
                const battleRequest: BattleRequestMessage = JSON.parse(battleRequestMessage.body);
                handleBattleRequestMessage(battleRequest);
            } catch (error) {
                console.error('Error parsing battle request message:', error);
            }
        });

        const battleSetupSubscription = subscribe('/user/queue/battle-setup', (battleSetupMessage: Message) => {
            try {
                const battleSetup: BattleSetupMessage = JSON.parse(battleSetupMessage.body);
                handleBattleSetupMessage(battleSetup);
            } catch (error) {
                console.error('Error parsing battle request message:', error);
            }
        });

        return () => {
            unsubscribe(battleRequestSubscription || '');
            unsubscribe(battleSetupSubscription || '');
        };

    }, [subscribe])


    const subscribeToBattleTopic = (id: string) => {
        // Increment subscription count
        setSubscriptionsCount(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
        console.log("battle-message: " + battleSessionMessage.body);
        try {
            saveBattleSession(JSON.parse(battleSessionMessage.body));

        } catch (error) {
            console.error('Error parsing battle request message:', error);
        }
    }

    function handleBattleRequestMessage(message: BattleRequestMessage) {
        console.log("battle-request: " + message.battleSessionId);
        addBattleRequestToast({
            message: message.message,
            senderUid: message.senderUid,
            senderUsername: message.senderUsername,
            battleSessionId: message.battleSessionId,
            acceptHandler: (battleContext: IBattleSession) => {
                saveBattleSession(battleContext);
            }

        });
    }

    function handleBattleSetupMessage(message: BattleSetupMessage) {
        // Handle received messages
        console.log("battle-setup: " + message);
        subscribe("/topic/battle/" + message.battleSessionId, (battleMessage: Message) => {
            handleBattleMessage(battleMessage)
        });
        sendWebSocketMessage('/app/subscribe-ack', JSON.stringify({ battleId: message.battleSessionId }));
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

