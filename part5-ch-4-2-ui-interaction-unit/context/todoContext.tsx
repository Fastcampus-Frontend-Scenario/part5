import { FC, PropsWithChildren, createContext, useState } from 'react';

import { TodoContextType, Todo } from 'types/Todo'

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    createTodo: (item: Todo) => { },
    updateTodo: (id: number) => { },
    deleteTodo: (id: number) => { },
});

type Props = {
    value: Array<Todo>
}

const TodoProvider: FC<PropsWithChildren<Props>> = ({ value, children }) => {
    const [todos, setTodos] = useState<Todo[]>(value);

    const createTodo = (item: Todo) => {
        setTodos([...todos, item]);
    };

    const updateTodo = (id: number) => {
        todos.filter((todo: Todo) => {
            if (todo.id === id) {
                todo.status = !todo.status;
                setTodos([...todos]);
            }
        });
    };

    const deleteTodo = (id: number) => {
        const filtered = todos.filter((item: Todo) => item.id !== id);
        setTodos(filtered)
    };
    return <TodoContext.Provider value={{ todos, createTodo, updateTodo, deleteTodo }}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
