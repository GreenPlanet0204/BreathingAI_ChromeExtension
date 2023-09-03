import { io } from 'socket.io-client';

export enum SocketEvents {
  CONNECT = 'connect',
  MESSAGE = 'message',
}

export interface SocketListenEventsMap {
  [SocketEvents.CONNECT]: () => void;
}

export interface SocketEmitsEventsMap {
  [SocketEvents.MESSAGE]: (message: string) => void;
}

export function createSocketConnection() {
  // const socket: Socket<SocketListenEventsMap, SocketEmitsEventsMap> = io(
  // const socket = io("http://localhost:3000");
  // socket.on(SocketEvents.CONNECT, () => {
  //   // chrome.notifications.create(socket.id, {
  //   //   type: "basic",
  //   //   title: "Welcome Back",
  //   //   message: "Ready to start to improve?",
  //   //   iconUrl: "icons/logo-512x512.png",
  //   // });
  // });
  // return socket;
}
