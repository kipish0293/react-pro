import { useRef } from 'react'
import type { ClickData } from './model/types'

const ClickTimer = () => {
    const ref = useRef<ClickData>({ startTime: null, clickCount: 0 })

    const onClick = () => {
        const now = Date.now()

        if (ref.current.startTime === null) {
            ref.current.startTime = now
        }

        ref.current.clickCount += 1
        console.log(`Разница с первым кликом: ${now - ref.current.startTime} мс, всего кликов: ${ref.current.clickCount}`)
        console.log(JSON.stringify(ref.current, null, 2))
    }

    return (
        <button type="button" onClick={onClick}>
            Клик
        </button>
    )
}

export default ClickTimer
