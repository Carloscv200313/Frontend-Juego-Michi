import { SocketProvider } from './context/SocketProvider'
import { Raya } from './Raya'
export const IndexRaya = () => {
    return (
        <SocketProvider>
            <Raya />
        </SocketProvider>
    )
}