import { SelectOption } from "@/types/select";
import {
    Select as NextUISelect,
    SelectItem,
    SelectProps as NextUISelectProps,
} from "@nextui-org/react";

type SelectProps = Partial<NextUISelectProps> & {
    // value?: SelectOption | null; TODO: make value a prop and do the logic in this component to set selectedKeys
    options: SelectOption[];
    [key: string]: any;
};

export default function Select({ options, ...restPops }: SelectProps) {
    return (
        <NextUISelect
            size="md"
            radius="sm"
            variant="bordered"
            color="primary" // TODO: change theme colors
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
            {...restPops}
        >
            {options.map((option) => (
                <SelectItem
                    key={option.value}
                    value={option.value}
                    color="primary"
                >
                    {option.label}
                </SelectItem>
            ))}
        </NextUISelect>
    );
}
