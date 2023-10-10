import { useState } from "react"

type Props = {
    initialProps: number
}

const Counter: React.FC<Props> = ({ initialProps }: Props) => {
    const [count, setCount] = useState(initialProps)

    return (
        <div>
            <div role="display">{initialProps}</div>
            <br />
            <div role="count">{count}</div>
            <button name="+" onClick={() => setCount(count + 1)}>+</button>
            <button name="-" onClick={() => setCount(count - 1)}>-</button>
        </div>
    )
}

export default Counter