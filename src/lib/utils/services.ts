import Platform from '../api/platform';
import { CookiesFacade } from './cookies';
import { createSocketConnection } from './scoket.io/socket';
import { Socket } from 'socket.io-client';

export interface IServices {
  cookies: CookiesFacade;
  api: Platform;
  socket: Socket;
}

export const setupServices = () => {
  // @todo: fix for production - use nev vars
  const cookies = new CookiesFacade('https://api.breathing.ai');

  const socket = createSocketConnection();

  const api = new Platform({
    cookies,
    apiUrl: 'https://api.breathing.ai',
    mock: false,
  });

  return {
    cookies,
    api,
    socket,
  };
};

const services = setupServices();

export default services;
