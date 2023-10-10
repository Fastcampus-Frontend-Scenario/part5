import { useState } from "react"
import Toast from "./Toast"

const ToastContainer: React.FC = () => {
    const [ visible, setVisible ] = useState(false)
    const handleVisible = () => {
        if (!visible) {
            setVisible(true)
            setTimeout(() => setVisible(false), 1000)
        }
    }
    return (
        <div>
            <button onClick={handleVisible}>Show Toast</button>
            <Toast visible={visible} message={'Button clicked'}/>
        </div>
    )
}
export default ToastContainer