import * as React from "react";
import { simpleFetch } from "../services/simpleFetch";

export const useRowDataFetch = <T> (url: string) => {
    const [rowData, setRowData] = React.useState<T[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    
    const fetchData = React.useCallback(async () => {
        try {
            const data = await simpleFetch(url);
            setRowData(data);
        } catch (err) {
            setError('Failed to fetch funds');
        }
    }, [url]);
    
    React.useEffect(() => {
    fetchData();
    }, [fetchData]);
    
    return {
        rowData,
        error
    }
}