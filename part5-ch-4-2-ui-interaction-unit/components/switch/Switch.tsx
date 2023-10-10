import { useDebounce } from '@/hooks/useDebounce';
import { FC, useEffect, useState } from 'react'

type Props = {
    toggled?: boolean
}
export const Switch: FC<Props> = ({ toggled }: Props) => {
    const [internal, setInternal] = useState<boolean>(!!toggled);
    const [checked, setChecked] = useState<boolean>(internal);
    const debouncedValue = useDebounce<boolean>(internal, 30)


    const callback = () => {
        setInternal(!internal);
    };

    useEffect(() => {
        setChecked(debouncedValue)
    }, [debouncedValue])

    return (
        <label role='switch'>
            <input type="checkbox" checked={checked} onChange={callback} />
            <span></span>
            {checked ? 'on' : 'off'}
        </label>
    );
}

export default Switch;