import { JSX, PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren): JSX.Element {
    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            {children}
        </div>
    );
}
