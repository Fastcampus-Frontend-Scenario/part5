import { TodoContext } from "@/context/todoContext"
import { FC, useContext } from "react"
import { Todo } from "@/types/Todo"

type Props = {
    item: Todo
}
export const TodoItem: FC<Props> = ({ item }: Props) => {
    const { id, name, status } = item
    const { updateTodo, deleteTodo } = useContext(TodoContext)
    const handleUpdate = () => updateTodo(id)
    const handleDelete = () => deleteTodo(id)
    return (
        <div className="Card">
            <h1 className={!status ? '' : 'line-through'}>{name}</h1>
            <div>
                {<button className='btn-complete' onClick={handleUpdate}>{status ? '미완료' : '완료'}</button>}
                {<button className='btn-delete' onClick={handleDelete}>삭제</button>}
            </div>
        </div>
    )
}