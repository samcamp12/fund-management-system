import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';

export const Navigation: React.FC = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      logout();
      handleClose();
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <AutoGraphTwoToneIcon sx={{ fontSize: 30, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Fund Corinth
          </Typography>
          <Button color="inherit" component={Link} to="/" >Dashboard</Button>
          <Button color="inherit" component={Link} to="/investors">Investors</Button>
          <Button color="inherit" component={Link} to="/regulatory">Regulatory</Button>
          <Button color="inherit" component={Link} to="/market-data">Market Data</Button>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircleIcon/>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {user ? (
              <>
                <MenuItem onClick={handleClose} component={Link} to="/user-info">
                  User Info
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClose} component={Link} to="/login">
                Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  };