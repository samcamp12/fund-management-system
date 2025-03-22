// src/components/FundGrid.tsx
import React, { JSX } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { ColDef, themeQuartz } from 'ag-grid-community';

import { formatDate } from './ColumnFormatters'
import { StockData } from '../MarketDataPage';

export const StockGrid = ({rowData}: {
    rowData: StockData[]
}): JSX.Element => {

  const columnDefs: ColDef<StockData>[] = [
    { headerName: 'Date', field: "date", sortable: true, filter: true,       
        cellClass: "dateUS",
        valueFormatter: formatDate,
    },
    { headerName: 'NASDAQ: GOOG', field: 'google', sortable: true, filter: true },
    { headerName: 'NASDAQ: AAPL', field: 'amazon', sortable: true, filter: true },
    { headerName: 'NASDAQ: AMZN', field: 'amazon', sortable: true, filter: true },
  ];

  return (
    <div style={{ height: "400px", width: '100%' }}>
        <AgGridReact<StockData>
          theme={themeQuartz}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onFirstDataRendered={(params) => params.api.autoSizeAllColumns()}
        />        
    </div>

  );
};
