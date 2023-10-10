import cn from 'classnames'
import { findInputError, isFormInvalid } from '../utils'
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

type Props = {
    name: string
    label: string
    type?: string
    id: string
    placeholder: string
    validation?: RegisterOptions<FieldValues, string> 
    multiline?: boolean
    className?: string
}

export const Input: React.FC<Props> = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    multiline,
    className,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputErrors = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputErrors)

    const input_tailwind =
        'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60'

    return (
        <div className={cn('flex flex-col w-full gap-2', className)}>
            <div className="flex justify-between">
                <label htmlFor={id} className="font-semibold capitalize">
                    {label}
                </label>
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputErrors.error?.message as string ?? ''}
                            key={inputErrors.error?.message as string ?? 'no-error'}
                        />
                    )}
                </AnimatePresence>
            </div>
            {multiline ? (
                <textarea
                    id={id}
                    className={cn(input_tailwind, 'min-h-[10rem] max-h-[20rem] resize-y')}
                    placeholder={placeholder}
                    {...register(name, validation)}
                ></textarea>
            ) : (
                <input
                    id={id}
                    type={type}
                    className={cn(input_tailwind)}
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            )}
        </div>
    )
}

type ErrorProps = {
    message?: string
}
const InputError: React.FC<ErrorProps> = ({ message }) => {
    return (
        <motion.p
            className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
            {...framer_error}
        >
            <MdError />
            {message}
        </motion.p>
    )
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}
