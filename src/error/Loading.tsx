import Gato from "./Gato";


const Loader = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 p-4 overflow-hidden text-white">
      <div className="">
      <Gato />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-9xl font-bold text-white mb-8 animate-bounce">500</div>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-200">¡¡Server Error!!</p>
        <p className="md:text-lg xl:text-2xl text-neutral-300 mt-4">Tenemos problemas en nuestros servidores.</p>
      </div>
    </div>
  );
}

export default Loader;
