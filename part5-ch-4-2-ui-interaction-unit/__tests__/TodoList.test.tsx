import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages';
import TodoProvider from '@/context/todoContext';
import { Todo } from '@/types/Todo';
import { TodoList } from '@/components/TodoList';

const renderComponent = (value: Array<Todo>) => {
    return render(
        <TodoProvider value={value}>
            <TodoList />
        </TodoProvider>
    )
}

describe('TodoList', () => {
    it('Render test with 1 Todo item', () => {
        renderComponent([
            {
                id: 123,
                name: 'Todo-item',
                status: true
            }
        ])
        expect(screen.getByRole('summary').textContent).toBe('Total items: 1')
        expect(screen.getByRole('list-container').getElementsByClassName('Card').length).toBe(1)
    })
    it('Render test with 3 Todo item', () => {
        renderComponent([
            {
                id: 1,
                name: '1',
                status: true
            },
            {
                id: 2,
                name: '2',
                status: true
            },
            {
                id: 3,
                name: '3',
                status: true
            }
        ])
        expect(screen.getByRole('summary').textContent).toBe('Total items: 3')
        expect(screen.getByRole('list-container').getElementsByClassName('Card').length).toBe(3)
    })
})