import { ValueFormatterParams } from "ag-grid-community";

export const formatDate = (params: ValueFormatterParams) => {
    const date = new Date(params.value);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substring(2);
    return month + "/" + day + "/" + year;
}