import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";
import { TodoContextType } from "@/types/Todo";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const { todos } = useContext(TodoContext);
    return (
        <div>
            <div role='summary'>
                {`Total items: ${todos.length}`}
            </div>
            <div role='list-container'>
                {todos.map((item) => <TodoItem item={item} key={item.id} />)}
            </div>
        </div>
    )
}