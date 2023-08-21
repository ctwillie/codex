import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        ...restProps
    }: TextInputProps,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            {...restProps}
            type={type}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                className
            }
            ref={localRef}
        />
    );
});
