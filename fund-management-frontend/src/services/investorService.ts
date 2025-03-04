import { api } from "../constants/API";

// src/services/investorService.ts
export async function fetchInvestors() {
    const response = await fetch(`${api}/investors`);
    if (!response.ok) {
      throw new Error('Failed to fetch investors');
    }
    return response.json();
  }
  
  export async function addInvestor(investor: any) {
    const response = await fetch(`${api}/investors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(investor)
    });
    if (!response.ok) {
      throw new Error('Failed to add investor');
    }
    return response.json();
  }
  
  export async function updateInvestor(investorID: number, investor: any) {
    const response = await fetch(`${api}/investors/${investorID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(investor)
    });
    if (!response.ok) {
      throw new Error('Failed to update investor');
    }
    return response.json();
  }
  
  export async function deleteInvestor(investorID: number) {
    const response = await fetch(`${api}/investors/${investorID}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete investor');
    }
    return response.json();
  }
  