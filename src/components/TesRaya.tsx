import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { SocketContext } from "../context/SocketContex";

interface Jugador {
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

interface Props {
    jugadoress: Jugador[];
    usuario: Jugador;
    idBatalla: string;
}

export default function TresRaya({ jugadoress, usuario, idBatalla }: Props) {
    const [tablero, setTablero] = useState(Array(9).fill(null));
    const [ganador, setGanador] = useState<string | null>(null);
    const [esMiTurno, setEsMiTurno] = useState(false);
    const [asignaciones, setAsignaciones] = useState<{ [key: string]: "X" | "O" }>({});
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (jugadoress.length >= 2) {
            setAsignaciones({
                [jugadoress[0].id]: "X",
                [jugadoress[1].id]: "O",
            });

            // El primer jugador en la lista empieza el juego
            setEsMiTurno(usuario.id === jugadoress[0].id);
        }
    }, [jugadoress, usuario.id]);

    useEffect(() => {
        socket.on("movimiento-realizado", ({ index, usuario }) => {
            setTablero((prevTablero) => {
                const nuevoTablero = [...prevTablero];
                if (asignaciones[usuario.id]) {
                    nuevoTablero[index] = asignaciones[usuario.id];
                }
                return nuevoTablero;
            });
        });
    
        socket.on("turno", ({ turno }) => {
            setEsMiTurno(turno);
        });
    
        return () => {
            socket.off("movimiento-realizado");
            socket.off("turno");
        };
    }, [socket, asignaciones]);
    

    const verificarGanador = (cuadros: (string | null)[]) => {
        const lineasGanadoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
            [0, 4, 8], [2, 4, 6], // Diagonales
        ];

        for (const [a, b, c] of lineasGanadoras) {
            if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[a] === cuadros[c]) {
                return cuadros[a];
            }
        }
        return null;
    };

    const manejarClick = (index: number) => {
        if (tablero[index] || ganador || !esMiTurno) return;

        socket.emit("nuevo-movimiento", { idBatalla, index, usuario });

        const nuevoTablero = [...tablero];
        nuevoTablero[index] = asignaciones[usuario.id];
        setTablero(nuevoTablero);

        const posibleGanador = verificarGanador(nuevoTablero);
        if (posibleGanador) {
            setGanador(posibleGanador);
        } else if (!nuevoTablero.includes(null)) {
            setGanador("Empate");
        }
    };

    return (
        <div className="w-[350px] p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-center text-xl font-bold mb-4">Tres en Raya</h2>

            {/* Lista de jugadores con indicador de turno */}
            <div className="mb-4">
                {jugadoress.map((jugador) => (
                    <p 
                        key={jugador.id} 
                        className={`text-lg font-semibold ${
                            jugador.id === usuario.id && esMiTurno ? "text-green-500" : "text-gray-700"
                        }`}
                    >
                        {jugador.name} {usuario.id === jugador.id && esMiTurno ? "⭐ (Tu turno)" : ""}
                    </p>
                ))}
            </div>

            {/* Tablero */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                {tablero.map((cuadro, index) => (
                    <motion.button
                        key={index}
                        className={`w-20 h-20 text-4xl font-bold flex items-center justify-center rounded-md
                            ${cuadro === "X" ? "text-blue-500" : cuadro === "O" ? "text-red-500" : "text-gray-700"}
                            ${!tablero[index] && esMiTurno && !ganador ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100"}
                        `}
                        onClick={() => manejarClick(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!!tablero[index] || !esMiTurno || ganador !== null}
                    >
                        {cuadro}
                    </motion.button>
                ))}
            </div>

            {/* Mensaje de turno o ganador */}
            <div className="text-center">
                {ganador ? (
                    <p className="text-xl font-bold">{ganador === "Empate" ? "¡Empate!" : `Ganador: ${ganador}`}</p>
                ) : (
                    <p className="text-xl">
                        Turno de:{" "}
                        <span className="font-bold text-green-500">
                            {esMiTurno ? "Tu turno" : "Esperando al otro jugador..."}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}
