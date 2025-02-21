import { useEffect, useMemo, useState } from "react"
import io from "socket.io-client"
export const useSocket = (serverPath: string) => {
    const socket = useMemo(() => io(serverPath, { transports: ["websocket"] }), [serverPath])
    const [online, setOnline] = useState(false)
    const [cantidad, setCantidad] = useState(0)
    useEffect(() => {
        setOnline(socket.connected)
    }, [socket])
    useEffect(() => {
        socket.on("connect", () => {
            setOnline(true)
            socket.on("catidad-de-connectados", (dato) => {
                setCantidad(dato)
            })
        })
    }, [socket])
    useEffect(() => {
        socket.on("disconnect", () => {
            setOnline(false);
            socket.on("catidad-de-connectados", (dato) => {
                setCantidad(dato)
            })
        });
    }, [socket]);
    return {
        socket,
        online,
        cantidad
    }
}
