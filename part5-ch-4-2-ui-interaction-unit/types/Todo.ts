export type Todo = {
    id: number
    name: string
    status: boolean // false - todo, true - done 
}

export type TodoContextType = {
    todos: Array<Todo>
    createTodo: (todo: Todo) => void;
    updateTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};