
type Props = {
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange: (columnIndex: number, value: string | null) => void;
}

export const TableHeadSelect = ({ columnIndex, selectedColumns, onChange }: Props) => {
    return (
        <div>
            TableHeadSelect !!
        </div>
    )
};