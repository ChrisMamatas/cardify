import SockJS from 'sockjs-client';
import Stomp, { Client, Message } from 'webstomp-client';


let stompClient: Client | null = null;
let isConnected = false;

interface BattleRequestMessage {
    message: string;
    senderUid: string;
    senderUsername: string;
    battleSessionId: string;
}

interface battleSetupMessage {
    battleSessionId: string;

}


function handleBattleRequestMessage(message: BattleRequestMessage, addBattleRequestToast: (data: BattleRequestMessage) => void) {
    console.log("battle-request: " + message.battleSessionId);
    addBattleRequestToast({
        message: message.message,
        senderUid: message.senderUid,
        senderUsername: message.senderUsername,
        battleSessionId: message.battleSessionId
    });
}

function handleBattleSetupMessage(message: battleSetupMessage) {
    // Handle received messages
    console.log("battle-setup: " + message);
    stompClient?.subscribe("/topic/battle/" + message.battleSessionId, battleMessage => {
        // Handle received messages
        console.log("battle: " + battleMessage.body);
    });
    stompClient?.send('/app/subscribe-ack', JSON.stringify({ battleId: message.battleSessionId }));
}

export const connectWebSocket = (token: string, addBattleRequestToast: (data: any) => void) => {
    if (stompClient) {
        stompClient.disconnect();
    }

    // Replace with your WebSocket URL and use the token as needed
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    // Configure to use the Bearer token in the connect headers
    const headers = {
        Authorization: `Bearer ${token}`,
        ContentType: 'application/json'
    };

    stompClient.connect(headers, frame => {
        console.log('Connected: ' + frame);
        isConnected = true;

        // Subscribe to your user-specific topic
        stompClient?.subscribe('/user/queue/battle-requests', battleRequestMessage => {
            try {
                const battleRequest: BattleRequestMessage = JSON.parse(battleRequestMessage.body);
                handleBattleRequestMessage(battleRequest, addBattleRequestToast);
            } catch (error) {
                console.error('Error parsing battle request message:', error);
            }
        });

        stompClient?.subscribe('/user/queue/battle-setup', battleSetupMessage => {
            try {
                const battleSetup: BattleRequestMessage = JSON.parse(battleSetupMessage.body);
                handleBattleSetupMessage(battleSetup);
            } catch (error) {
                console.error('Error parsing battle request message:', error);
            }
        });

        // You can also subscribe to other topics as needed
    }, error => {
        // Handle errors
        console.error(error);
        stompClient?.disconnect();
    });
};

export const sendWebSocketMessage = (destination: string, message: string) => {
    if (stompClient && isConnected) {
        stompClient.send(destination, message);
    } else {
        console.error("STOMP client is not connected.");
    }
};


export const closeWebSocket = () => {
    if (stompClient) {
        stompClient.disconnect();
    }
};

export const subscribe = (topic: string, callback: ((message: Message) => any)) => {
    if (stompClient && isConnected) {
        return stompClient.subscribe(topic, callback).id;

    }
}

export const unsubscribe = (id: string) => {
    if (stompClient) {
        stompClient.unsubscribe(id)
    }
}
