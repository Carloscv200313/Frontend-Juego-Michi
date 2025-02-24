import { SocketContext } from "./context/SocketContex"
import { useLocation } from "react-router";
import { useState, useContext } from "react";
import EsperandoJugadores from "./components/Espera";
import TresRaya from "./components/TesRaya";
import { motion } from "framer-motion";
import { Error } from "./error/Error";
import Login from "./error/Loading";
interface Datos {
    id: string;
    name: string;
    user: string,
    password: string,
    idSocket: string,
    estado: boolean
    ganados: number
    perdidos: number
    empate: number
}
export const Raya = () => {
    const location = useLocation();
    const { online, socket, cantidad } = useContext(SocketContext)
    const { nombre, usuario, password } = location.state;
    const [activo, setActivo] = useState(false)
    const [start, setStart] = useState(false)
    const [jugadores, setJugadores] = useState<Datos[]>([])
    const [datos, setDatos] = useState<Datos>({ id: "", name: "", user: "", password: "", idSocket: "", estado: false, ganados: 0, perdidos: 0, empate: 0 })
    const [idBatalla, setIdBatalla] = useState("")
    socket.on("connect", () => {
        socket.emit("registrar", { nombre, usuario, password })
        socket.on("dato-del-usuario", (dato) => { setDatos(dato.usuario) })
    })
    console.log(socket)
    const Jugar = () => {
        socket.emit("añadir-sala", datos.id)
        socket.on("comenzar-batalla", (data) => {
            console.log(data)
            if (data.mensaje) {
                setActivo(false)
                setStart(true)
                setJugadores(data.jugadores)
                setIdBatalla(data.idBatalla)
            }
        })
        setActivo(true)
    }
    interface CardProps {
        title: string;
        value: string | number;
        color: string;
        isMono?: boolean;
    }

    const Card = ({ title, value, color, isMono = false }: CardProps) => {
        return (
            <motion.div
                className="bg-[#121212] p-4 rounded-xl shadow-lg border border-[#2a2a2a] flex flex-col items-center relative md:h-28 h-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-gray-400 font-medium md:text-xl text-base">{title}:</span>
                <span className={`font-bold md:text-2xl text-xl text-center h-full ${color} ${isMono ? "font-mono" : ""}`}>{typeof value === 'string' ? value.toUpperCase() : value}</span>
            </motion.div>
        );
    };
    if (!online && !activo && !start) {
        return(
            <Login />
        )
    }
    if ((!datos.name && !activo && !start)) {
        return(
            <Error />
        )
    }
    if (activo && !start) {
        return (
            <EsperandoJugadores activo={activo} setActivo={setActivo} />
        )
    }

    if (online && !activo && !start) {
        return (
            <div className="reltive h-screen w-full bg-black overflhidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[0%] top-[-15%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
                </div>
                <div className="relative w-full min-h-screen p-5 text-white grid md:grid-cols-2 grid-cols-1 place-items-center">
                    <div className="flex flex-col items-center justify-center gap-4 h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-4 xl:w-2xl w-[20rem]  p-4">
                            {/* Card: Nombre */}
                            <Card title="Nombre" value={datos.name} color="text-purple-500" />
                            {/* Card: Jugadores en línea */}
                            <Card title="Online" value={cantidad} color="text-blue-500" />
                            {/* Card: Juegos Ganados */}
                            <Card title="Ganados" value={datos.ganados} color="text-green-500" />
                            {/* Card: Juegos Perdidos */}
                            <Card title="Perdidos" value={datos.perdidos} color="text-red-500" />
                        </div>
                        <motion.button
                            className="mt-4 bg-[#2563eb] text-white font-bold py-5 md:text-5xl rounded-3xl shadow-lg border border-[#592118] relative overflow-hidden transition-all duration-300 md:w-2/4 w-2/4 cursor-pointer"
                            onClick={Jugar}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            𝕵𝖚𝖌𝖆𝖗
                        </motion.button>
                    </div>
                    <div className="h-full hidden md:flex justify-center xl:items-center">
                        <img src="/personaje.gif" alt="Personaje animado" className="h-4/5" />
                    </div>
                </div>
            </div>
        )
    }
    if (start) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <TresRaya jugadoress={jugadores} usuario={datos} idBatalla={idBatalla} />
            </main>
        )
    }
}
