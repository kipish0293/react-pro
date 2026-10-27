import ClickTimer from 'features/refExamples/ClickTimer'
import DeboucedLogger from 'features/refExamples/DebouncedLogger'
import FocusTracker from 'features/refExamples/FocusTracker'
import PreviousInput from 'features/refExamples/PreviousInput'
import WebSocketLogger from 'features/refExamples/WebSocketLogger'

export function RefExamplesPage() {
    return (
        <>
            <h1>Ref Examples</h1>

            <h3>ClickTimer</h3>
            <ClickTimer />
            <h3>PreviousInput</h3>
            <PreviousInput />
            <h3>FocusTracker</h3>
            <FocusTracker />
            <h3>WebSosocketLogger</h3>
            <WebSocketLogger />
            <h3>DebouncedLogger</h3>
            <DeboucedLogger />
        </>
    )
}
