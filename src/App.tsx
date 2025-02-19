import './App.css'
import Login from './components/Login';
import { TicTacToe } from './components/TicTacToe';

function App() {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className="relative h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px]">
        </div>
        <div className='absolute h-full w-full grid grid-cols-2 overflow-hidden'> 
          <div className='flex items-center justify-center'>
            <TicTacToe/>
          </div>
          <div className='flex flex-col items-center justify-center text-white'>
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
