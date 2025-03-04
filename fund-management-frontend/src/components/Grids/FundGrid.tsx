// src/components/FundGrid.tsx
import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import { themeQuartz } from 'ag-grid-community';

import { formatDate } from './ColumnFormatters';
import { useRowDataFetch } from '../../hooks/useRowDataFetch';

interface Fund {
  FundID: number;
  FundName: string;
  FundType: string;
  InceptionDate: string;
  TotalAssets: number;
  FundManagerID: number;
}

interface FundGridProps {
  url: string;
}

const FundGrid: React.FC<FundGridProps> = ({ url }) => {
  const { rowData, error } = useRowDataFetch<Fund>(url)

  const columnDefs: any = [
    { headerName: 'Fund ID', field: 'FundID', sortable: true, filter: true },
    { headerName: 'Fund Name', field: 'FundName', sortable: true, filter: true },
    { headerName: 'Fund Type', field: 'FundType', sortable: true, filter: true },
    { headerName: 'Inception Date', field: 'InceptionDate', sortable: true, filter: true,       
        cellClass: "dateUS",
        valueFormatter: formatDate,
    },
    { headerName: 'Total Assets (millions)', field: 'TotalAssets', sortable: true, filter: true },
    { headerName: 'Fund Manager ID', field: 'FundManagerID', sortable: true, filter: true },
  ];

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {error ? (
        <div>{error}</div>
      ) : (
        <AgGridReact
          theme={themeQuartz}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onFirstDataRendered={(params) => params.api.autoSizeAllColumns()}
        />
      )}
    </div>
  );
};

export default FundGrid;
