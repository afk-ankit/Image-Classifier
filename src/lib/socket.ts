import { io } from "socket.io-client";
const devMode = import.meta.env.DEV;

const URL = !devMode
  ? "http://localhost:8000"
  : import.meta.env.VITE_BACKEND_URL;

export const socket = io(URL);
