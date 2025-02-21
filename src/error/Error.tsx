"use client";
import Cohete from "./Cohete";
export const Error = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 p-4 overflow-hidden text-white">
            <div className="z-10 max-w-5xl mx-auto text-center grid grid-cols-2">
                <div>
                    <Cohete />
                </div>
                <div>
                    {/* Número 404 animado */}
                    <div className="text-9xl font-bold text-white mb-8 animate-bounce">404</div>
                    {/* Mensaje de error */}
                    <div className="space-y-4 mb-8">
                        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">¡Usuario no encontrado!</h1>
                        <p className="text-gray-300 text-lg">
                            Lo sentimos, pero no pudimos encontrar tu perfil en nuestro sistema. Por favor, regístrate para acceder a todas las funcionalidades.
                        </p>
                    </div>
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/" className="px-6 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition">
                            ⬅ Volver al inicio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
