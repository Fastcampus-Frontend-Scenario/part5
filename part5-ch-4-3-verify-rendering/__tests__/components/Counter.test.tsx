import Counter from "@/components/Counter"
import { render, screen } from "@testing-library/react"

test("Counter initialValue", () => {
    const { getByRole } = render(<Counter initialProps={1} />)

    expect(screen.getByRole('display').textContent).toBe("1")

    expect(screen.getByRole('button', { name: "+" })).toBeInTheDocument()
    expect(getByRole('button', { name: "-" })).toBeInTheDocument()
})

test("Counter initialValueChanged", () => {
    const { rerender } = render(<Counter initialProps={1} />)
    expect(screen.getByRole('display').textContent).toBe("1")
    rerender(<Counter initialProps={2} />)
    expect(screen.getByRole('display').textContent).toBe("2")
})