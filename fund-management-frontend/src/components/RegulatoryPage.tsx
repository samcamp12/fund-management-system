// src/components/RegulatoryPage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Snackbar 
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { fetchRegulatoryData, deleteRegulatoryData, updateRegulatoryData, addRegulatoryData } from '../services/regulatoryService';
import { formatDate } from './Grids/ColumnFormatters';


interface RegulatoryData {
  ComplianceID: number;
  FundID: number;
  ComplianceDate: string;
  ComplianceType: string;
  Status: string;
  Notes: string;
}

const RegulatoryPage: React.FC = () => {
  const [data, setData] = useState<RegulatoryData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedData, setSelectedData] = useState<RegulatoryData | null>(null);
  const [form, setForm] = useState({
    FundID: 0,
    ComplianceDate: '',
    ComplianceType: '',
    Status: '',
    Notes: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // AG‑Grid column definitions
  const columnDefs: ColDef[] = [
    { headerName: 'Compliance ID', field: 'ComplianceID', sortable: true, filter: true, width: 150 },
    { headerName: 'Fund ID', field: 'FundID', sortable: true, filter: true, width: 90 },
    { headerName: 'Compliance Date', field: 'ComplianceDate', sortable: true, filter: true, valueFormatter: formatDate },
    { headerName: 'Compliance Type', field: 'ComplianceType', sortable: true, filter: true },
    { headerName: 'Status', field: 'Status', sortable: true, filter: true },
    { headerName: 'Notes', field: 'Notes', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      minWidth: 200,
      cellRenderer: (params: any) => (
        <>
          <Button onClick={() => handleEdit(params.data)} size="small">Edit</Button>
          <Button onClick={() => handleDelete(params.data.ComplianceID)} size="small" color="error">
            Delete
          </Button>
        </>
      )
    }
  ];

  const refreshData = async () => {
    try {
      const result = await fetchRegulatoryData();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAdd = () => {
    setForm({
      FundID: 0,
      ComplianceDate: '',
      ComplianceType: '',
      Status: '',
      Notes: ''
    });
    setSelectedData(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEdit = (item: RegulatoryData) => {
    setForm({
      FundID: item.FundID,
      ComplianceDate: item.ComplianceDate,
      ComplianceType: item.ComplianceType,
      Status: item.Status,
      Notes: item.Notes
    });
    setSelectedData(item);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRegulatoryData(id);
      setSnackbarMessage('Compliance record deleted successfully.');
      refreshData();
    } catch (error) {
      setSnackbarMessage('Error deleting compliance record.');
      console.error(error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'FundID' ? Number(value) : value }));
  };

  const handleSave = async () => {
    try {
      if (isEditing && selectedData) {
        await updateRegulatoryData(selectedData.ComplianceID, form);
        setSnackbarMessage('Compliance record updated successfully.');
      } else {
        await addRegulatoryData(form);
        setSnackbarMessage('Compliance record added successfully.');
      }
      setOpenDialog(false);
      refreshData();
    } catch (error) {
      setSnackbarMessage('Error saving compliance record.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Regulatory Compliance</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAdd} 
        style={{ marginBottom: '1rem' }}
      >
        Add Compliance Record
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          theme={themeQuartz}
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
      {/* Dialog for adding/editing a compliance record */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? 'Edit Compliance Record' : 'Add Compliance Record'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Fund ID"
            name="FundID"
            type="number"
            value={form.FundID}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Compliance Date"
            name="ComplianceDate"
            type="date"
            value={form.ComplianceDate}
            onChange={handleFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Compliance Type"
            name="ComplianceType"
            value={form.ComplianceType}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Status"
            name="Status"
            value={form.Status}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Notes"
            name="Notes"
            value={form.Notes}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarMessage('')}
      />
    </Container>
  );
};

export default RegulatoryPage;
