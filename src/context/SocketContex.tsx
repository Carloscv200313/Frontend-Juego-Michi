import { createContext } from "react";
import { io, Socket } from "socket.io-client";
export const SocketContext = createContext<SocketContextType>({
    socket: io(), // Crea un socket temporal, pero NO se usará realmente
    online: true,
    cantidad: 0
});

interface SocketContextType {
    socket: Socket;
    online: boolean;
    cantidad: number
}