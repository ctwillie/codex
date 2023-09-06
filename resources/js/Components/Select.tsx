import { SelectOption } from "@/types/select";
import {
    Select as NextUISelect,
    SelectItem,
    SelectProps as NextUISelectProps,
    SelectedItems,
    SelectedItemProps,
} from "@nextui-org/react";

type SelectProps = Partial<NextUISelectProps> & {
    // value?: SelectOption | null; TODO: make value a prop and do the logic in this component to set selectedKeys
    options: SelectOption[];
    [key: string]: any;
};

export default function Select({ options, ...restPops }: SelectProps) {
    return (
        <NextUISelect
            aria-label="Select"
            size="md"
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            scrollShadowProps={{
                isEnabled: false,
                hideScrollBar: false,
            }}
            classNames={{
                trigger:
                    "dark:bg-gray-900 hover:dark:bg-gray-900 border-gray-300 dark:border-gray-700 dark:text-white",
                popover: "dark:bg-gray-900 dark:text-gray-100",
            }}
            renderValue={(items: SelectedItems) => {
                return items.map((i: SelectedItemProps) => {
                    const { textValue, value } = i.props as Record<string, any>;

                    return <div key={`render-value-${value}`}>{textValue}</div>;
                });
            }}
            listboxProps={{
                itemClasses: {
                    base: [
                        "text-foreground",
                        "transition-opacity",
                        "data-[hover=true]:!text-white",
                        "data-[hover=true]:bg-indigo-500",
                        "dark:data-[hover=true]:bg-indigo-500",
                        "dark:data-[selectable=true]:focus:bg-indigo-500",
                        "dark:data-[selectable=true]:!text-white",
                        "data-[focus-visible=true]:ring-indigo-500",
                    ],
                },
            }}
            {...restPops}
        >
            {options.map((option) => (
                <SelectItem
                    key={option.value}
                    value={option.value}
                    textValue={option.label}
                >
                    <div>{option.label}</div>
                </SelectItem>
            ))}
        </NextUISelect>
    );
}
