import { api } from "../constants/API";

// GET all compliance records
export const fetchRegulatoryData = async () => {
  const response = await fetch(`${api}/compliance-records`);
  if (!response.ok) {
    throw new Error('Error fetching compliance records');
  }
  return response.json();
};

// POST create a new compliance record
export const addRegulatoryData = async (data: {
  FundID: number;
  ComplianceDate: string;
  ComplianceType: string;
  Status: string;
  Notes: string;
}) => {
  const response = await fetch(`${api}/compliance-records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error creating compliance record');
  }
  return response.json();
};

// PUT update an existing compliance record
export const updateRegulatoryData = async (
  id: number,
  data: {
    FundID: number;
    ComplianceDate: string;
    ComplianceType: string;
    Status: string;
    Notes: string;
  }
) => {
  const response = await fetch(`${api}/compliance-records/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error updating compliance record');
  }
  return response.json();
};

// DELETE a compliance record
export const deleteRegulatoryData = async (id: number) => {
  const response = await fetch(`${api}/compliance-records/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting compliance record');
  }
  return response.json();
};
