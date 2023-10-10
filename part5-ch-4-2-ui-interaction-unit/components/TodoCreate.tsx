import { TodoContext } from "@/context/todoContext"
import { useContext, useState } from "react"

export const TodoCreate = () => {
    const { createTodo } = useContext(TodoContext)
    const [text, setText] = useState('')

    const handleClick = () => {
        console.log('handle Click,', text, text.length)
        if (text.length) {
            createTodo({
                id: Date.now(),
                name: text,
                status: false,
            })
        }
    }
    return (
        <div className='Form'>
            <input
                onChange={(evt) => {
                    const { value } = evt.target
                    setText(value)
                }}
                type="text"
                id="new-todo-input"
                className="input"
                autoComplete="off"
                aria-label="add-item-title"
            />
            <button type="submit" name="add" onClick={handleClick} disabled={!text.length} className="button">
                추가
            </button>
        </div>
    )
}