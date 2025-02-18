import { ReactNode } from "react";
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContex";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { socket, online, cantidad } = useSocket("http://localhost:3000/");

    return (
        <SocketContext.Provider value={{ socket, online, cantidad }}>
            {children}
        </SocketContext.Provider>
    );
};
