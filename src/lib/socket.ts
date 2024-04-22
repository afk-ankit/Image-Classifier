import { io } from "socket.io-client";

const URL = "https://whiteboard-server-shh3.onrender.com";
export const socket = io(URL);
