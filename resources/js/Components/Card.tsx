import classNames from "classnames";
import { JSX, PropsWithChildren } from "react";

type CardProps = {
    className?: string;
    [key: string]: any;
};

export default function Card({
    className,
    children,
    ...restProps
}: PropsWithChildren<CardProps>): JSX.Element {
    return (
        <div
            className={classNames(
                "p-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-800 dark:text-gray-100 shadow sm:rounded-lg",
                className
            )}
            {...restProps}
        >
            {children}
        </div>
    );
}
