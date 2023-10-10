import { CounterStepProvider, useCounter } from '@/context/useCounter'
import { PropsWithChildren } from 'react'
import { act, renderHook, waitFor } from '@testing-library/react' // <-- NOW


test('should use custom step when incrementing', () => {
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
        <CounterStepProvider step={2}>{children}</CounterStepProvider>
    )
    const { result } = renderHook(() => useCounter(), { wrapper })

    act(() => {
        result.current.increment()
    })

    expect(result.current.count).toBe(2)
})

describe('useCounter with async test', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })
    test('should increment counter after delay', async () => {
        const { result } = renderHook(() => useCounter())

        result.current.incrementAsync()

        await act(() => jest.runAllTimers())

        expect(result.current.count).toBe(1)
    })
})