import { useCallback, useRef } from 'react'

const FocusTracker = () => {
    const focusRef = useRef(0)
    const firstRef = useRef<HTMLInputElement | null>(null)
    const secondtRef = useRef<HTMLInputElement | null>(null)

    const onFocus = useCallback(() => {
        focusRef.current += 1

        console.log(`Кол-во переводов фокуса: ${focusRef.current}`)
    }, [])

    const onClick = useCallback(() => {
        if (firstRef.current) {
            firstRef.current.focus()
        }
    }, [])

    return (
        <>
            <label>
                first
                <input ref={firstRef} onFocus={onFocus} />
            </label>

            <label>
                second
                <input ref={secondtRef} onFocus={onFocus} />
            </label>

            <button onClick={onClick}>Сфокусировать на первом</button>
        </>
    )
}

export default FocusTracker
