import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

class WebSocketService {
  constructor(token) {
    this.token = token;
    this.connect();
  }

  connect() {
    // If your WebSocket endpoint is configured at /ws in your Spring application
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    // Configure to use the Bearer token in the connect headers
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    this.stompClient.connect(headers, frame => {
      console.log('Connected: ' + frame);

      // Subscribe to your user-specific topic
      this.stompClient.subscribe('/user/queue/battle-requests', battleRequestMessage => {
        // Handle received messages
        console.log("battle-request: " + battleRequestMessage.body);
      });

      this.stompClient.subscribe('/user/queue/battle-setup', battleSetupMessage => {
        // Handle received messages
        console.log("battle-setup: " + battleSetupMessage.body);
        this.stompClient.subscribe(battleSetupMessage.body, battleMessage => {
          // Handle received messages
          console.log("battle: " + battleMessage.body);
        });
        this.stompClient.send('/app/subscribe-ack', JSON.stringify({ battleId: battleSetupMessage.body.split('/')[3] }));
      });

      // You can also subscribe to other topics as needed
    }, error => {
      // Handle errors
      console.error(error);
      this.disconnect();
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  // More methods for sending messages, handling subscriptions, etc.
}
const firebaseToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FyZGlmeS1kMDUxOSIsImF1ZCI6ImNhcmRpZnktZDA1MTkiLCJhdXRoX3RpbWUiOjE2OTk2Njc1ODksInVzZXJfaWQiOiJycUt1MkxDdnZuY1RUSGtncld0M0Vmd3FMQ2YyIiwic3ViIjoicnFLdTJMQ3Z2bmNUVEhrZ3JXdDNFZndxTENmMiIsImlhdCI6MTY5OTY2NzU4OSwiZXhwIjoxNjk5NjcxMTg5LCJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0MkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.PiS7xMQ7t0t00zymILjQ69y5SY9qJ88yaiw-cuzQ4JWWwCoQQ5j7Z0KJB1_CyGQbtfSabpNu1QSrws5dRCFMFHAuNQbbcL5X9nzNK84QR4KWZOkKm5XjeRUpnSjZ-PQ8cvW-vptRYXLbfaB6rhsrs9KCpePeAPX02ynRXdjhryqholQx41iBD0yz51vYsE_c55MAsQ_K4swfZV0ZJFvJ1ozCGM3O_TEcwRIA1CcSGHhTiBIs9WRsFE1vs9dWq-6DkukKRQvKC4intwuHFpH99iFE4acNwxHypgIpYfHzO5UaC0rM8GfLx3Ei4fAz4OiDTSlgbzG3Gl2blFP7kWoN-Q';
const webSocketService = new WebSocketService(firebaseToken);