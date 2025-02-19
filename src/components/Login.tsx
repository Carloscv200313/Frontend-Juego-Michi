import { useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/Raya", { state: { nombre, usuario, password } });
    };

    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="relative flex flex-col items-center pt-10 rounded-4xl shadow-xl  bg-black/50">
            <div className="absolute inset-0 rounded-4xl border-[4px] border-transparent"
                style={{
                    background: "linear-gradient(-40deg, #e81cff 0%, #40c9ff 100%)",
                    mask: "linear-gradient(white, white) padding-box, linear-gradient(white, white)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "destination-out"
                }}></div>
            {/* Switch para alternar entre Login y Sign Up */}
            <div className="relative flex items-center gap-6 mb-0">
                <span className={`font-semibold text-xl ${!isSignUp ? "text-[#ad9de8]" : ""}`}>Login</span>
                <label className="relative w-12 h-6 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isSignUp}
                        onChange={() => setIsSignUp(!isSignUp)}
                    />
                    {/* Fondo del switch */}
                    <span className={`block w-12 h-6 rounded-full transition duration-300 ${!isSignUp ? "bg-[#ad9de8] " : "bg-[#8057d0] "} `}></span>
                    {/* Bolita deslizante */}
                    <span
                        className="absolute top-0.5 left-1 w-5 h-5 bg-white rounded-full shadow-md transition duration-300"
                        style={{ transform: isSignUp ? "translateX(24px)" : "translateX(0)" }}
                    ></span>
                </label>
                <span className={`font-semibold text-xl ${isSignUp ? "text-[#8057d0] " : ""}`}>Sign up</span>
            </div>


            {/* Contenedor con animación de flip */}
            <div className="relative w-80 h-96 perspective flex flex-col justify-between items-baseline ">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform`}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* Lado Login */}
                    <div
                        className="absolute w-full h-full flex flex-col items-center justify-center  bg-wh rounded-lg shadow-md p-6"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <h2 className="text-xl font-bold mb-4">Iniciar Sesion</h2>
                        <form className="flex flex-col gap-8 w-full justify-between">
                            <input type="text" placeholder="Usuario" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setUsuario(e.target.value)} />
                            <input type="password" placeholder="Password" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900">Let's go!</button>
                        </form>
                    </div>

                    {/* Lado Sign Up */}
                    <div
                        className="absolute w-full h-full flex flex-col items-center justify-center bg-gra0 rounded-lg shadow-md p-6"
                        style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <h2 className="text-xl font-bold mb-4">Sign up</h2>
                        <form className="flex flex-col gap-4 w-full">
                            <input type="text" placeholder="Nombre" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setNombre(e.target.value)} />
                            <input type="text" placeholder="Usuario" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setUsuario(e.target.value)} />
                            <input type="password" placeholder="Password" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900">Confirm!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}