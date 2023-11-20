// context/WebSocketContext.tsx
import React, { createContext, useCallback, useState, useEffect, FC, useContext } from 'react';
import Stomp, { Client, Message } from 'webstomp-client';
import { WebSocketContextType } from '../@types/Websocket';
import SockJS from 'sockjs-client';
import { auth } from "../../firebaseConfig.ts";

interface Props {
    children: React.ReactNode;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null);


export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);

    if (context === null) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }

    return context;
};

export const WebSocketProvider: FC<Props> = ({ children }) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);



    // WebSocket connection logic...
    const connectWebSocket = useCallback((token: string) => {
        if (isConnected) return;
        console.log("connecting websocket")
        const socket = new SockJS('http://localhost:8080/ws');

        var client = Stomp.over(socket);
        setStompClient(client);


        // Configure to use the Bearer token in the connect headers
        const headers = {
            Authorization: `Bearer ${token}`,
            ContentType: 'application/json'
        };

        client.connect(headers, frame => {
            console.log('Connected: ' + frame);
            setIsConnected(true);

            // Subscribe to your user-specific topic

            // You can also subscribe to other topics as needed
        }, error => {
            // Handle errors
            console.log('Error connecting to WebSocket: ' + error);
            stompClient?.disconnect();
        });
    }, [stompClient, isConnected]);

    const closeWebSocket = useCallback(() => {
        if (stompClient && isConnected) {
            try {
                stompClient.disconnect(() => {
                    console.log('Disconnected successfully');
                    setIsConnected(false);
                });
            } catch (error) {
                console.error('Error during WebSocket disconnection:', error);
            }
        } else {
            console.warn('WebSocket client is not connected or not initialized.');
        }
    }, [stompClient, isConnected]);

    const sendWebSocketMessage = (destination: string, message: string) => {
        if (stompClient && isConnected) {
            stompClient.send(destination, message);
        } else {
            console.error("STOMP client is not connected.");
        }
    };
    const subscribe = useCallback((topic: string, callback: ((message: Message) => any)) => {
        if (stompClient && isConnected) {
            return stompClient.subscribe(topic, callback).id;

        }
    }, [isConnected]);

    const unsubscribe = (id: string) => {
        if (stompClient) {
            stompClient.unsubscribe(id)
        }
    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {

        (async () => {
            if (isAuthenticated) {
                console.log("Auth changed, connecting websocket")
                const idToken = await auth.currentUser?.getIdToken() || "";
                connectWebSocket(idToken);
            } else {
                console.log("Auth changed, closing websocket")
                closeWebSocket();
            }
        })();


    }, [isAuthenticated]);



    const contextValue: WebSocketContextType = {
        sendWebSocketMessage,
        subscribe,
        unsubscribe,
        isConnected,
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};
