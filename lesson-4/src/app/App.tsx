import { RegisterPage } from 'pages/register/ui/RegisterPage'
import { WisardPage } from 'pages/wisard/ui/WisardPage'
import styles from './App.module.css'

function App() {
    return (
        <div className={styles.container}>
            <RegisterPage />
            <WisardPage />
        </div>
    )
}

export default App
