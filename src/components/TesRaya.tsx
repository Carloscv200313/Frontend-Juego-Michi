import { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { SocketContext } from "../context/SocketContex";
import { useNavigate } from "react-router";

interface Jugador {
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

interface Props {
    jugadoress: Jugador[];
    usuario: Jugador;
    idBatalla: string;
}

export default function TresRaya({ jugadoress, usuario, idBatalla }: Props) {
    const [tablero, setTablero] = useState(Array(9).fill(null));
    const [ganador, setGanador] = useState<string | null>(null);
    const [gana, setGana] = useState<Jugador>()
    const modalRef = useRef<HTMLDialogElement>(null);
    const [esMiTurno, setEsMiTurno] = useState(false);
    const [asignaciones, setAsignaciones] = useState<{ [key: string]: "X" | "O" }>({});
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
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
        socket.on("ganador", ({ usuario }) => {
            if (usuario) {
                setGana(usuario)
                modalRef.current?.showModal();
            } else {
                modalRef.current?.close();
            }
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
            socket.emit("batalla-ganada", { idBatalla, usuario });
            console.log(usuario.name)
            setGanador(posibleGanador);
        } else if (!nuevoTablero.includes(null)) {
            setGanador("Empate");
        }
    };
    const onReiniciar = () => {

    }
    const onInicio = () => {
        navigate("/Raya");
    }

    return (
        <div className="absolute inset-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px] flex items-center justify-center">
            <dialog
                ref={modalRef}
                className={ `flex flex-col justify-between items-center p-6 bg-gradient-to-t from-gray-600 to-gray-300 shadow-xl border border-gray-800 rounded-4xl w-2xl xl:h-1/2 h-2/3 text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${!gana ? 'hidden' : ''}`}            >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 ¡Tenemos un ganador! 🎉</h1>
                <div>
                    <p className="text-8xl text-gray-800 font-bold">{gana?.name}</p>
                    <p className="text-2xl text-gray-700 font-semibold">ha ganado la partida</p>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={onReiniciar}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        🔄 Volver a jugar
                    </button>
                    <button
                        onClick={onInicio}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                    >
                        🏠 Volver al inicio
                    </button>
                </div>
            </dialog>
            <div className="grid grid-cols-3 items-center justify-items-center p-4">
                <div className={`flex flex-col items-center justify-center text-5xl font-serif p-4 gap-8 ${esMiTurno && usuario.id === jugadoress[0].id ? "text-white" : "text-cyan-600"}`}>
                    <p>
                        {jugadoress[0].name.toUpperCase()}
                        {esMiTurno && usuario.id === jugadoress[0].id ? " ⭐" : ""}
                    </p>
                    <div className="flex justify-center">
                        <img src="/personaje-01.gif" alt="Personaje animado" className="h-80" />
                    </div>
                </div>
                {/* Tablero */}
                <div className="relative max-w-auto h-auto p-6 border rounded-lg shadow-md bg-black/30 drop-shadow-xl text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Tic Tac Toe</h2>
                    {/* Tablero del juego */}
                    <div className="grid grid-cols-3 grid-rows-3 gap-4 mb-4">
                        {tablero.map((cuadro, index) => (
                            <motion.button
                                key={index}
                                className={`w-24 h-24 text-4xl font-bold flex items-center justify-center rounded-md
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
                                <span className="font-bold text-green-500">
                                    {esMiTurno ? "Tu turno" : "Esperando al otro jugador..."}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                {/* Jugador 2 */}
                <div className={`flex flex-col items-center justify-center text-5xl font-serif p-4  gap-8
                        ${esMiTurno && usuario.id === jugadoress[1].id ? "text-white" : "text-cyan-600"}`}>
                    <p>
                        {jugadoress[1].name.toUpperCase()}
                        {esMiTurno && usuario.id === jugadoress[1].id ? "⭐" : ""}
                    </p>
                    <div className="flex justify-center">
                        <img src="/personaje.gif" alt="Personaje animado" className="h-80" />
                    </div>
                </div>
            </div>
        </div>
    );
}
