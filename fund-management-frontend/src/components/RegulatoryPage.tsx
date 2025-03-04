// src/components/RegulatoryPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

interface RegulatoryData {
  id: number;
  agency: string;
  deadline: string;
  complianceStatus: string;
  keyPersonnel: string;
  notes: string;
}

const initialRegulatoryData: RegulatoryData[] = [
  {
    id: 1,
    agency: 'SEC',
    deadline: '2025-04-30',
    complianceStatus: 'Compliant',
    keyPersonnel: 'John Doe',
    notes: 'All reports submitted on time.',
  },
  {
    id: 2,
    agency: 'FINRA',
    deadline: '2025-06-15',
    complianceStatus: 'Pending',
    keyPersonnel: 'Jane Smith',
    notes: 'Awaiting additional documentation.',
  },
];

const RegulatoryPage: React.FC = () => {
  const [regulatoryData, setRegulatoryData] = useState<RegulatoryData[]>([]);

  useEffect(() => {
    // Replace with API call as needed
    setRegulatoryData(initialRegulatoryData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Regulatory Compliance</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agency</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Compliance Status</TableCell>
              <TableCell>Key Personnel</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regulatoryData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.agency}</TableCell>
                <TableCell>{item.deadline}</TableCell>
                <TableCell>{item.complianceStatus}</TableCell>
                <TableCell>{item.keyPersonnel}</TableCell>
                <TableCell>{item.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default RegulatoryPage;
