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
const firebaseToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FyZGlmeS1kMDUxOSIsImF1ZCI6ImNhcmRpZnktZDA1MTkiLCJhdXRoX3RpbWUiOjE2OTk2Njc2MDgsInVzZXJfaWQiOiI3ejZqakpMSXduYjRsUUhWaW1hOENJVFkwRGkxIiwic3ViIjoiN3o2ampKTEl3bmI0bFFIVmltYThDSVRZMERpMSIsImlhdCI6MTY5OTY2NzYwOCwiZXhwIjoxNjk5NjcxMjA4LCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.fpr_067YNZVj2Yl1a_iq44z8gOoqlqNxQB-MU5TO05D_pHN5F0DesARJxVxmeOlYbOSBZQ_kwqhosuxptzzG_jTqD2KZ4w17EEuvwJfOq163bZnmwAksv-JBBZkRpekshgUTRiIYuMaJ_d8-fOwAjK6iSxDwBrf55cKoVO1wwWPa-ytEPuBRF80SYXhYyRICYHuDBwgQ3PdMb3HVyge73XIl73N8j3BRnem0BCyM9akz4XEeb8Z_KVWbH1CIt6MpiJ9sivAZO6NO-iUE8BlvGPmx--8ZvFcKI3sHCuUKtkqDWJAls2FiIjCt0jJr24EUSw0X7PIkjVVpwhMdrbPgmw';
const webSocketService = new WebSocketService(firebaseToken);