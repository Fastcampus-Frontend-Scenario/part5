import { FC, useState } from "react"

type Props = {
    initialCount?: number
}
export const Counter: FC<Props> = ({ initialCount = 0 }: Props) => {
    const [count, setCount] = useState<number>(initialCount)
    const increase = () => setCount(count + 1)
    const decrease = () => setCount(count - 1)
    const reset = () => setCount(initialCount)
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <button name='-' onClick={decrease}> - </button>
            <div role='count'>
                {count}
            </div>
            <button name='+' onClick={increase}> + </button>
            <button name='reset' onClick={reset}> reset </button>
        </div>
    )
}