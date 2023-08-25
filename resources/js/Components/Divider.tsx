import classNames from "classnames";
import { JSX } from "react";

type DividerProps = {
    color?:
        | "gray"
        | "red"
        | "yellow"
        | "green"
        | "blue"
        | "indigo"
        | "purple"
        | "pink";
    className?: string;
};

export default function Divider({
    color = "gray",
    className = "",
}: DividerProps): JSX.Element {
    const dividerColorStyles = {
        gray: "bg-gray-100 dark:bg-gray-500",
        red: "bg-red-100 dark:bg-red-500",
        yellow: "bg-yellow-100 dark:bg-yellow-500",
        green: "bg-green-100 dark:bg-green-500",
        blue: "bg-blue-100 dark:bg-blue-500",
        indigo: "bg-indigo-100 dark:bg-indigo-500",
        purple: "bg-purple-100 dark:bg-purple-500",
        pink: "bg-pink-100 dark:bg-pink-500",
    };

    return (
        <hr
            className={classNames(
                dividerColorStyles[color],
                "my-12 h-0.5 border-t-0 opacity-100 dark:opacity-25",
                className
            )}
        />
    );
}
