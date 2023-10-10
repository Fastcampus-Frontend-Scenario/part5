import { ChangeEvent, useState } from 'react'

const Counter: React.FC = () => {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)

    const increment = () => setCount(count +1)
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value))
    const applyValue = () => setCount(value)
    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <h1>count: {count}</h1>
            <div>
                <button onClick={increment}>+</button>
                <input
                    name='value'
                    type='number'
                    value={value}
                    onChange={handleInput}
                />
                <button onClick={applyValue}>Apply</button>
            </div>
        </div>
    )
}

export default Counter

/*
type number called value
it will change the value on input element

button apply
on click this button value will be filled in count

브라우저에서 5 넣고 Apply누르면 count가 5로 되고 화면에 갱신된다.
*/