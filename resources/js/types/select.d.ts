export type ValueSelectOption = {
    label: string;
    value: string | number;
};

export type EmptySelectOption = {
    label: string;
    value: null;
};

export type SelectOption = ValueSelectOption | EmptySelectOption;
