import Switch from "@/pages/switch";
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('<Switch />', () => {
    it('render default status as off', () => {
        render(<Switch />);
        expect(screen.queryByRole('switch', { name: /off/i })).toBeInTheDocument();
    })
    it('click input, and check it turned on', async () => {
        render(<Switch />);
        fireEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('switch', { name: /on/i })).toBeInTheDocument(); // failed => on will be checked after 300ms, async
        // expect(await screen.findByRole('switch', { name: /on/i })).toBeInTheDocument(); // okay, handled async with `findBy***`
        // expect(await waitFor(() => screen.getByRole('switch', { name: /on/i }))).toBeInTheDocument(); // okay, handled async with `waitFor`
    })
});





