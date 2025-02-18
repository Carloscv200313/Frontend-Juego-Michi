import { SocketContext } from "./context/SocketContex"
import { useLocation } from "react-router";
import { useState, useContext } from "react";
import EsperandoJugadores from "./components/Espera";
import TresRaya from "./components/TesRaya";
interface Datos {
    id: string;
    name: string;
    user: string,
    password: string,
    idSocket: string,
    estado: boolean
    ganados: number
    perdidos: number
    empate:number
}
export const Raya = () => {
    const location = useLocation();
    const { online, socket, cantidad } = useContext(SocketContext)
    const {nombre, usuario, password} = location.state;
    const [activo, setActivo] = useState(false)
    const [start, setStart] = useState(false)
    const [jugadores, setJugadores] = useState<Datos[]>([])
    const [datos, setDatos] = useState<Datos>({ id: "", name: "", user: "", password: "", idSocket: "", estado: false, ganados: 0, perdidos: 0, empate: 0 })
    const [idBatalla, setIdBatalla] = useState("")
    socket.on("connect", () => {
        socket.emit("registrar", {nombre, usuario, password})
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
    if (activo && !start) {
        return (
            <EsperandoJugadores activo={activo} setActivo={setActivo} />
        )
    }
    if (!activo && !start) 
    {
        return (
            <div className="w-full max-w-md mx-auto shadow-lg border rounded-lg p-4 m-10">
                
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Perfil del Jugador</h2>
                    <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${online ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                            }`}
                    >
                        {online ? "En línea" : "Desconectado"}
                    </span>
                </div>

                {/* Contenido */}
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Jugadores en línea:</span>
                        </div>
                        <span className="font-bold text-blue-600">{cantidad}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="font-medium">Nombre:</span>
                        <span className="font-bold">{datos.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="font-medium">ID:</span>
                        <span className="font-mono">{datos.id}</span>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Ganados:</span>
                            <span className="font-bold text-green-600">{datos.ganados}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium">Perdidos:</span>
                            <span className="font-bold text-red-600">{datos.perdidos}</span>
                        </div>
                    </div>
                </div>

                {/* Pie de página */}
                <div className="mt-4">
                    <button className={`w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 cursor-pointer`}
                        onClick={Jugar}>
                        Jugar
                    </button>
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
