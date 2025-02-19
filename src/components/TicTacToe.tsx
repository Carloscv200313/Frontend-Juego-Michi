import { motion } from "framer-motion";

export const TicTacToe = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.3,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div className="flex flex-col items-center py-24 h-full bg-transparent">
            {/* Letras animadas con efecto neón */}
            <div className="flex flex-row flex-wrap items-start justify-center">
                {["𝕋𝕚𝕔", "𝕋𝕒𝕔", "𝕋𝕠𝕖"].map((word, i) => (
                    <motion.h1
                        key={word}
                        custom={i}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-9xl font-extrabold uppercase neon-text"
                    >
                        {word}
                    </motion.h1>
                ))}
            </div>

            {/* Imagen GIF animada */}
            <div className="flex items-center justify-center mt-8">
                <img
                    src="/tic.png"
                    alt="GIF animado"
                    className="w-80 h-80 object-cover bg-transparent"
                />
            </div>
        </div>
    );
};
