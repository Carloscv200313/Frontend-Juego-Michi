"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    activo: boolean;
    setActivo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EsperandoJugadores({ activo, setActivo }: Props) {
    const [contador, setContador] = useState(5)
    useEffect(() => {
        setActivo(true) // Se activa al renderizar
        let intervalo: ReturnType<typeof setInterval> | null = null

        if (activo && contador > 0) {
            intervalo = setInterval(() => {
                setContador((prevContador) => prevContador - 1)
            }, 1500)
        }
        if(contador==0){
            setActivo(false)
        }
        
        return () => {
            if (intervalo) clearInterval(intervalo)
        }
    }, [activo, contador, setActivo])

    const color = `hsl(${contador * 36}, 100%, 50%)`

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white relative">
            <h2 className="text-3xl font-semibold mb-8 text-gray-300">
                Esperando Jugadores...
            </h2>

            <div className="relative flex justify-center items-center">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        boxShadow: `0 0 100px ${color}55`,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={contador}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[15vw] font-bold z-10"
                        style={{ color }}
                    >
                        {contador}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
