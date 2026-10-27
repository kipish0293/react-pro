import { useEffect, useRef, type ChangeEvent } from 'react'

const DeboucedLogger = () => {
    const timerRef = useRef<number | null>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            console.log(`Печать прекращена, итоговое значение: ${text}`)
        }, 1000)
    }

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current)
            }
        }
    })

    return (
        <label>
            debounced
            <input onChange={onChange} />
        </label>
    )
}

export default DeboucedLogger
