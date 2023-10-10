import React, { ChangeEvent } from 'react'

const DebounceInput = () => {
    const [inputValue, setInputValue] = React.useState('')
    const [debouncedValue, setDebouncedValue] = React.useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [inputValue])

    return (
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h1>{debouncedValue}</h1>
            <input type='text' value={inputValue} onChange={handleInputChange} />
        </div>
    )
}

export default DebounceInput