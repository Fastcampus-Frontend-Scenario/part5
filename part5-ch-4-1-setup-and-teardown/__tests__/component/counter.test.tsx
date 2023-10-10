import { Counter } from "@/components/Counter"
import { render, screen } from "@testing-library/react"

describe("Counter component", () => {
    it("InitialCount = 0", () => {
        render(<Counter />)

        expect(screen.getByRole('count').textContent).toBe('0')


    })
})