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
                "p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg",
                className
            )}
            {...restProps}
        >
            {children}
        </div>
    );
}
