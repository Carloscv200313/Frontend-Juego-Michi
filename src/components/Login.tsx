import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [modo, setModo] = useState<"login" | "registro">("login"); // Alternar entre login y registro
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!usuario || !password || (modo === "registro" && !nombre)) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (modo === "registro") {
            console.log(`Registrando usuario:
            - Nombre: ${nombre}
            - Usuario: ${usuario}
            - Password: ${password}`);
            // Aquí podrías hacer una petición a tu backend para registrar al usuario
        } else {
            console.log(`Iniciando sesión con:
            - Usuario: ${usuario}
            - Password: ${password}`);
            // Aquí podrías hacer una petición a tu backend para autenticar al usuario
        }

        navigate("/Raya", { state: { nombre, usuario, password } });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">
                {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
            </h2>

            <div className="flex justify-center space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded-md ${modo === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setModo("login")}
                >
                    Iniciar Sesión
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${modo === "registro" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setModo("registro")}
                >
                    Registrarse
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {modo === "registro" && (
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
                </button>
            </form>
        </div>
    );
}
