import React, { useCallback, useEffect, useRef, useState } from 'react'

const PreviousInput = () => {
    const [value, setValue] = useState('')
    const prevRef = useRef('')
    const outputRef = useRef<HTMLParagraphElement>(null)

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target?.value || '')
    }, [])

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.textContent = `Предыдущее значение: ${prevRef.current || ''}`
        }

        prevRef.current = value
    }, [value])

    return (
        <>
            <input onChange={onChange} value={value} />
            <p ref={outputRef} />
        </>
    )
}

export default PreviousInput
