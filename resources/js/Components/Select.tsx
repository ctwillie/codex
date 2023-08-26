import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { EmptySelectOption, SelectOption } from "@/types/select";
import classNames from "classnames";

type SelectProps = {
    label: string | null;
    value: SelectOption | null;
    options: SelectOption[];
    className?: string | null;
    onChange: (selectedOption: SelectOption) => void;
    [key: string]: any;
};

export default function Select({
    label = null,
    value,
    options: selectionOptions,
    className = null,
    onChange,
    ...restProps
}: SelectProps) {
    // TODO: account for is required or optional
    // prepend empty option if not required
    const emptySelectOption: EmptySelectOption = {
        label: "Select an option",
        value: null,
    };

    let defaultValue = value === null ? emptySelectOption : value;
    selectionOptions = [emptySelectOption, ...selectionOptions];
    const [selected, setSelected] = useState(defaultValue);

    const onSelectChange = (selectedOption: SelectOption) => {
        setSelected(selectedOption);
        onChange(selectedOption);
    };

    return (
        <Listbox value={selected} onChange={onSelectChange} {...restProps}>
            {({ open }) => (
                <>
                    {label && (
                        <Listbox.Label className="block font-medium text-sm text-gray-700 dark:text-gray-300">
                            {label}
                        </Listbox.Label>
                    )}

                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white dark:bg-gray-800 py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">
                                {selected?.label || "Select an option"}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className={classNames(
                                    "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm",
                                    className
                                )}
                            >
                                {selectionOptions.map((selectOption) => (
                                    <Listbox.Option
                                        key={selectOption.value}
                                        className={({ active }) =>
                                            classNames(
                                                "relative cursor-default select-none py-2 pl-3 pr-9 text-white",
                                                {
                                                    "bg-indigo-600": active,
                                                    "text-gray-900": !active,
                                                }
                                            )
                                        }
                                        value={selectOption}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate"
                                                    )}
                                                >
                                                    {selectOption.label}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
