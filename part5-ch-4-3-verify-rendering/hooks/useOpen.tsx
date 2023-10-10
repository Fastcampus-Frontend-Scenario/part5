import { useState } from 'react';

export default function useOpen(defValue: boolean = false) {
    const [open, setOpen] = useState(defValue);

    return {
        open,
        setOpen,
    };
}