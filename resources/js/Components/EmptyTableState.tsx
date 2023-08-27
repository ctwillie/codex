import EmptyState from "@/Components/EmptyState";

type EmptyTableStateProps = {
    colSpan: number;
};

export default function EmptyTableState({
    colSpan,
}: EmptyTableStateProps): JSX.Element {
    return (
        <tr>
            <td colSpan={colSpan} className="px-6 pt-12 whitespace-nowrap">
                <EmptyState />
            </td>
        </tr>
    );
}
