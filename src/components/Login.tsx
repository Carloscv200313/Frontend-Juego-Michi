import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/Raya", { state: { nombre, usuario, password } });
    };

    return (
        <div className="relative flex flex-col items-center rounded-4xl shadow-xl bg-black/50 pb-8">
            <div className="absolute inset-0 rounded-4xl border-[4px] border-transparent"
                style={{
                    background: "linear-gradient(-40deg, #e81cff 0%, #40c9ff 100%)",
                    mask: "linear-gradient(white, white) padding-box, linear-gradient(white, white)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "destination-out"
                }}></div>
            
            {/* Contenedor de Login/SignUp */}
            <div className="relative w-80 h-96 perspective flex flex-col justify-between items-baseline">
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform`}
                    style={{
                        transformStyle: "preserve-3d",
                        transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {/* Lado Login */}
                    <div
                        className="absolute w-full h-full flex flex-col items-center justify-center  rounded-lg shadow-md p-6 pb-0"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
                        <form className="flex flex-col gap-4 w-full">
                            <input type="text" placeholder="Usuario" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setUsuario(e.target.value)} />
                            <input type="password" placeholder="Contraseña" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-gray-800 text-white p-2 rounded-4xl hover:bg-gray-900" onClick={handleSubmit}>Ingresar</button>
                        </form>
                    </div>

                    {/* Lado Sign Up */}
                    <div
                        className="absolute w-full h-full flex flex-col items-center justify-center  rounded-lg shadow-md p-6"
                        style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <h2 className="text-xl font-bold mb-4">Crear Cuenta</h2>
                        <form className="flex flex-col gap-4 w-full">
                            <input type="text" placeholder="Nombre" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setNombre(e.target.value)} />
                            <input type="text" placeholder="Usuario" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setUsuario(e.target.value)} />
                            <input type="password" placeholder="Contraseña" className="border border-gray-400 p-2 rounded w-full" onChange={(e) => setPassword(e.target.value)} />
                            <button className="bg-gray-800 text-white p-2 rounded-4xl hover:bg-gray-900" onClick={handleSubmit}>Registrarse</button>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Opción para cambiar entre Login y SignUp */}
            <div className="relative mt-6 text-sm">
                {isSignUp ? (
                    <p className="text-gray-400">¿Ya tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsSignUp(false)}>Inicia sesión</span></p>
                ) : (
                    <p className="text-gray-400">¿No tienes cuenta? <span className="text-blue-400 cursor-pointer" onClick={() => setIsSignUp(true)}>Regístrate</span></p>
                )}
            </div>
        </div>
    );
}
