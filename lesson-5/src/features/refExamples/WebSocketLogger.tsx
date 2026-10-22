import { useEffect, useRef } from 'react'

const WebSocketLogger = () => {
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const socket = new WebSocket('wss://echo.websocket.org')

        socket.onmessage = (ev: MessageEvent) => {
            console.log(ev)
        }

        socketRef.current = socket

        return () => {
            socketRef.current?.close()
        }
    }, [])

    return <>WebSocket logger</>
}

export default WebSocketLogger
