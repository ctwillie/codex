import {
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

type ToastProps = {
    message: string;
    type?: "success" | "error";
    description?: string | undefined;
};

export default function Toast({
    message,
    type = "success",
    description = undefined,
}: ToastProps) {
    const getIcon = () => {
        switch (type) {
            case "error":
                return (
                    <ExclamationCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                    />
                );
            default:
                return (
                    <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                    />
                );
        }
    };

    return (
        <>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">{getIcon()}</div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {message}
                            </p>
                            {description && (
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
