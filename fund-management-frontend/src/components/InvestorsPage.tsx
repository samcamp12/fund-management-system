// src/components/InvestorsPage.tsx
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
import { fetchInvestors, addInvestor, updateInvestor, deleteInvestor } from '../services/investorService';
import { ColDef, themeQuartz } from 'ag-grid-community';

interface Investor {
  InvestorID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

const InvestorsPage: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [investorForm, setInvestorForm] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Address: ''
  });
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // AG‑Grid column definitions
  const columnDefs : ColDef[] = [
    { headerName: 'Investor ID', field: 'InvestorID', sortable: true, filter: true, width: 120 },
    { headerName: 'First Name', field: 'FirstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'LastName', sortable: true, filter: true },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true },
    { headerName: 'Address', field: 'Address', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 200,
      cellRenderer: (params: any) => (
        <>
          <Button onClick={() => handleEditInvestor(params.data)} size="small">Edit</Button>
          <Button onClick={() => handleDeleteInvestor(params.data.InvestorID)} size="small" color="error">
            Delete
          </Button>
        </>
      )
    }
  ];

  const refreshInvestors = async () => {
    try {
      const data = await fetchInvestors();
      setInvestors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshInvestors();
  }, []);

  const handleEditInvestor = (investor: Investor) => {
    setInvestorForm({
      FirstName: investor.FirstName,
      LastName: investor.LastName,
      Email: investor.Email,
      Phone: investor.Phone,
      Address: investor.Address
    });
    setSelectedInvestor(investor);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteInvestor = async (id: number) => {
    try {
      await deleteInvestor(id);
      setSnackbarMessage('Investor deleted successfully.');
      refreshInvestors();
    } catch (error) {
      setSnackbarMessage('Error deleting investor.');
      console.error(error);
    }
  };

  const handleAddInvestor = () => {
    setInvestorForm({
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Address: ''
    });
    setSelectedInvestor(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInvestor = async () => {
    try {
      if (isEditing && selectedInvestor) {
        // Update existing investor
        await updateInvestor(selectedInvestor.InvestorID, { ...investorForm, UserID: 1 });
        setSnackbarMessage('Investor updated successfully.');
      } else {
        // Create a new investor
        await addInvestor({ ...investorForm, UserID: 1 });
        setSnackbarMessage('Investor added successfully.');
      }
      setOpenDialog(false);
      refreshInvestors();
    } catch (error) {
      setSnackbarMessage('Error saving investor.');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>Investors</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddInvestor} 
        style={{ marginBottom: '1rem' }}
      >
        Add Investor
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          theme={themeQuartz}
          rowData={investors}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      {/* Dialog for adding/editing an investor */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? 'Edit Investor' : 'Add Investor'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="FirstName"
            value={investorForm.FirstName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="LastName"
            value={investorForm.LastName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="Email"
            value={investorForm.Email}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="Phone"
            value={investorForm.Phone}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Address"
            name="Address"
            value={investorForm.Address}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveInvestor} color="primary">Save</Button>
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

export default InvestorsPage;
