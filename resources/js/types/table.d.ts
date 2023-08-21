import { ReactNode } from "react";

export type Column = {
    key: string | number;
    title?: string;
    format?: string;
    render: string | ((item: any) => ReactNode);
};
