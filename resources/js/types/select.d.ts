export type ValueSelectOption<T extends object = {}> = {
    label: string;
    value: string | number;
} & T;

// export type EmptySelectOption<T extends object = {}> = {
//     label: string;
//     value: null;
// } & T;

export type SelectOption<T extends object = {}> = ValueSelectOption<T>;

// | EmptySelectOption<T>;

export type TechnologySelectOption = SelectOption<{
    categoryId: string;
}>;
