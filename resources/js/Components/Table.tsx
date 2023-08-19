import { Column } from "@/types/table";
import { ReactNode } from "react";

type TableProps = {
    title: string;
    data: any[];
    description: string;
    className?: string;
    columns: Column[];
    action?: ReactNode;
    [key: string]: any;
};

export default function Table({
    title,
    data,
    description,
    columns,
    action,
    className,
}: TableProps): JSX.Element {
    const $headerStyles = (index: number) => {
        return index === 0
            ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-0"
            : index === columns.length - 1
            ? "relative py-3.5 pl-3 pr-4 sm:pr-0 text-gray-100"
            : "px-3 py-3.5 text-left text-sm font-semibold text-gray-100";
    };

    const $columnStyles = (index: number) => {
        return index === 0
            ? "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
            : index === columns.length - 1
            ? "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
            : "whitespace-nowrap px-3 py-4 text-sm text-gray-300";
    };

    const buildTableCells = (dataItem: any) => {
        return columns.map((column, index) => {
            const { key, title, render } = column;
            const cellKey = `column-${title?.toLowerCase()}-${dataItem[key]}`;

            if (typeof render === "function") {
                return (
                    <td key={cellKey} className={$columnStyles(index)}>
                        {render(dataItem)}
                    </td>
                );
            }

            return (
                <td key={cellKey} className={$columnStyles(index)}>
                    {dataItem[render]}
                </td>
            );
        });
    };

    return (
        <div className={className}>
            {/* Header */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">{description}</p>
                </div>
                {action && (
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        {action}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    {columns.map(({ title }, index) => (
                                        <th
                                            key={`column-${title?.toLowerCase()}`}
                                            scope="col"
                                            className={$headerStyles(index)}
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800">
                                {data.map((dataItem) => (
                                    <tr key={dataItem.name}>
                                        {buildTableCells(dataItem)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
