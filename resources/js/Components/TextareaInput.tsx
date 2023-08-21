import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isFocused?: boolean;
    rows?: number;
};

export default function TextareaInput({
    className = "",
    isFocused = false,
    rows = 2,
    ...restProps
}: TextAreaProps) {
    return (
        <textarea
            {...restProps}
            rows={rows}
            className={
                "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                className
            }
        ></textarea>
    );
}
