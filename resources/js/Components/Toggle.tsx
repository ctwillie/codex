import { JSX, useState } from "react";
import { Switch } from "@headlessui/react";
import { noop } from "@/utils";
import classNames from "classnames";

type ToggleProps = {
    label: string | null;
    labelPosition?: "left" | "right";
    enabled?: boolean;
    className?: string | null;
    onChange?: (enabled: boolean) => void;
};

export default function Toggle({
    label,
    labelPosition = "right",
    enabled = false,
    className = null,
    onChange = noop,
}: ToggleProps): JSX.Element {
    const [isEnabled, setIsEnabled] = useState(enabled);

    const onToggleChange = (enabled: boolean) => {
        setIsEnabled(enabled);
        onChange(enabled);
    };

    return (
        <Switch.Group
            as="div"
            className={classNames("flex items-center", className)}
        >
            {label && labelPosition === "left" && (
                <Switch.Label as="span" className="mr-3 text-sm">
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                        {label}
                    </span>
                </Switch.Label>
            )}

            <Switch
                checked={isEnabled}
                onChange={onToggleChange}
                className={classNames(
                    isEnabled ? "bg-indigo-600" : "bg-gray-500",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        isEnabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-gray-200 shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>

            {label && labelPosition === "right" && (
                <Switch.Label as="span" className="ml-3 text-sm">
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                        {label}
                    </span>
                </Switch.Label>
            )}
        </Switch.Group>
    );
}
