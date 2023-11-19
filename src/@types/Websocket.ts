import { Message } from "webstomp-client";



export interface WebSocketContextType {
    sendWebSocketMessage: (destination: string, message: string) => void;
    subscribe: (topic: string, callback: (message: Message) => any) => string | undefined;
    unsubscribe: (id: string) => void;
    isConnected: boolean;
}