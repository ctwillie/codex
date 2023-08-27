import classNames from "classnames";
import { JSX } from "react";

type EmptyStateProps = {
    className?: string;
};

export default function EmptyState({
    className,
}: EmptyStateProps): JSX.Element {
    return (
        <div
            className={classNames(
                "flex flex-col items-center justify-center",
                className
            )}
        >
            <p className="text-gray-500 text-sm">Sorry, nothing to see here</p>
        </div>
    );
}
