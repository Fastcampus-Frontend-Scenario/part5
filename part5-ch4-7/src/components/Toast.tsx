type Props = {
    visible?: boolean
    message: string
}
const Toast: React.FC<Props> = ({ visible, message }) => {
    if (!visible) {
        return null
    }

    return (
        <div role='alert'
            style={{
            position: "absolute",
            top: '50px',
            right: '50px',
            padding: '16px',
            background: 'black',
            color: 'white'
        }}>
            {message}
        </div>
    )
}

export default Toast