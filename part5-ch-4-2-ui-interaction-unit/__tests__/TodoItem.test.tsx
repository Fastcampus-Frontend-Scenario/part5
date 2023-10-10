import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoProvider from '@/context/todoContext';
import { Todo } from '@/types/Todo';
import { TodoItem } from '@/components/TodoItem';

const renderComponent = (value: Todo) => {
    return render(
        <TodoProvider value={[value]}>
            <TodoItem item={value} />
        </TodoProvider>
    )
}

describe('TodoItem', () => {
    it('Render test with completed Todo item', () => {
        renderComponent(
            {
                id: 123,
                name: 'Todo-item',
                status: true
            }
        )
        expect(screen.getByText('Todo-item')).toHaveClass('line-through')
        expect(screen.getByText('미완료')).toHaveClass('btn-complete')
        expect(screen.getByText('삭제')).toHaveClass('btn-delete')
    })
    it('Render test with incompleted 1 Todo item', () => {
        renderComponent(
            {
                id: 123,
                name: 'Todo-item',
                status: false
            }
        )
        expect(screen.getByText('Todo-item').className).toBe('')
        expect(screen.getByText('완료')).toHaveClass('btn-complete')
        expect(screen.getByText('삭제')).toHaveClass('btn-delete')
    })
})