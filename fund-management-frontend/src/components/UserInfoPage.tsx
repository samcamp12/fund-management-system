// src/components/UserInfoPage.tsx
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const UserInfoPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6">No user information available. Please log in.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <Typography variant="body1">Username: {user.username}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Paper>
    </Container>
  );
};

export default UserInfoPage;
