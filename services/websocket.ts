import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient: Stomp.Client | null = null;
let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000/",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
}

export function connect(): Promise<Stomp.Frame> {
  const socket = new SockJS("http://localhost:8980/gs-guide-websocket");
  stompClient = Stomp.over(socket);
  return new Promise(async (resolve, reject) => {
    await stompClient!.connect(headers, frame => {
      resolve(frame as Stomp.Frame);
    }, error => {
      reject(error);
    });
  });
}

export function disconnect(): void {
  if (stompClient !== null) {
    stompClient.disconnect(() => {
    });
  }
}

export function subscribe(destination: string, callback: (message: Stomp.Message) => void): void {
  if (stompClient !== null) {
    stompClient.subscribe(destination, callback);
  }
}

export function sendMessage(destination: string, body: any): void {
  if (stompClient !== null) {
    stompClient.send(destination, {}, JSON.stringify(body));
  }
}
