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
      this.stompClient.subscribe('/user/queue/challenges', message => {
        // Handle received messages
        console.log();
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
const firebaseToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FyZGlmeS1kMDUxOSIsImF1ZCI6ImNhcmRpZnktZDA1MTkiLCJhdXRoX3RpbWUiOjE2OTk0MTMxOTUsInVzZXJfaWQiOiI3ejZqakpMSXduYjRsUUhWaW1hOENJVFkwRGkxIiwic3ViIjoiN3o2ampKTEl3bmI0bFFIVmltYThDSVRZMERpMSIsImlhdCI6MTY5OTQxMzE5NSwiZXhwIjoxNjk5NDE2Nzk1LCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gz9-_JaHoXyI8c1PGkbCDRYwH9asMynME8WBljtnfyGQClGWmR0w7eG3SlDBmcTO7llOwqZMuKR_f_upBcOnJA_nar6w1WE-W064qpFmjHmuabmx2BhpqIeL-67mC8jDkoFBsgSmrvEtYvUkIAQT7YdcaQ5GR4I0RT61FGNV8i3SzYn44BYjm2zH88QVP5YSXJYvqyZZ27mMKs-p2wNmXG08r3mVhxqXyoI9Lq289XOn3I0DxAGZLa8y5lSDWK2L9ZChzXnQh8N8rF86LLz_PQT0vJaHiYFzaVhIB2_coM8crFq45PkCa8rBkjS8fNCsrXhlOqea62YiWblp8qd_Pg';
const webSocketService = new WebSocketService(firebaseToken);