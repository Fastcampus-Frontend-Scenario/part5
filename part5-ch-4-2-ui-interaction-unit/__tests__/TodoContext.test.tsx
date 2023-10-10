import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages';
import TodoProvider from '@/context/todoContext';
import { Todo } from '@/types/Todo';

const renderComponent = (value: Array<Todo>) => {
    return render(
        <TodoProvider value={value}>
            <Home />
        </TodoProvider>
    )
}

const checkListSize = (value: number) => {
    expect(screen.getByRole('summary').textContent).toBe(`Total items: ${value}`)
    expect(screen.getByRole('list-container').getElementsByClassName('Card').length).toBe(value)
}

describe('TodoProvider', () => {
    it('Render test with default value, sized 0', () => {
        renderComponent([])
        expect(screen.getByRole('summary').textContent).toBe('Total items: 0')
    })
    it('Render test with default value, sized 1', () => {
        renderComponent([
            {
                id: 123,
                name: 'Todo-item',
                status: true
            }
        ])
        expect(screen.getByRole('summary').textContent).toBe('Total items: 1')
    })

    it('Add button disable by default', () => {
        renderComponent([])
        const addButton = screen.getByText('추가')
        expect(addButton).toBeDisabled()
    })
    it('If input field has text, then Add button will be enabled', () => {
        renderComponent([])
        const input = screen.getByLabelText('add-item-title')
        fireEvent.change(input, { target: { value: 'title' } })
        const addButton = screen.getByText('추가')
        expect(addButton).toBeEnabled()
    })
    it('Click Add button will create todo item', () => {
        renderComponent([])
        const input = screen.getByLabelText('add-item-title')
        fireEvent.change(input, { target: { value: 'title' } })

        checkListSize(0)

        const addButton = screen.getByText('추가')
        fireEvent.click(addButton)
        expect(screen.getByRole('summary').textContent).toBe('Total items: 1')
        expect(screen.getByRole('list-container').getElementsByClassName('Card').length).toBe(1)
    })
    it('Click complete, and check status being incompleted', () => {
        renderComponent([
            {
                id: 123,
                name: 'Todo-item',
                status: false
            }
        ])

        const completeButton = screen.getByText('완료')
        fireEvent.click(completeButton)

        expect(completeButton.textContent).toBe('미완료')
        expect(screen.getByText('Todo-item').className).toBe('line-through')
    })
    it('Click incomplete, and check status being completed', () => {
        renderComponent([
            {
                id: 123,
                name: 'Todo-item',
                status: true
            }
        ])
        const completeButton = screen.getByText('미완료')
        fireEvent.click(completeButton)
        expect(completeButton.textContent).toBe('완료')
        expect(screen.getByText('Todo-item').className).toBe('')
    })
    it('Click delete, and check todo list item count reduced by 1', () => {
        renderComponent([
            {
                id: 123,
                name: 'Todo-item',
                status: true
            }
        ])
        const deleteButton = screen.getByText('삭제')
        fireEvent.click(deleteButton)

        checkListSize(0)
    })
})