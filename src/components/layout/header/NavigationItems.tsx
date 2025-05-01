import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Box, Zoom } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { headerStyles } from './HeaderStyles';

export const navigationConfig = [
  { text: 'Dashboard', path: '/', icon: <CalendarMonthIcon fontSize="small" /> },
  { text: 'Profile', path: '/profile', icon: <PersonIcon fontSize="small" /> }
];

interface NavigationItemsProps {
  mounted: boolean;
}

export const NavigationItems: React.FC<NavigationItemsProps> = ({ mounted }) => {
  const location = useLocation();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {navigationConfig.map((item, index) => (
        <Zoom in={mounted} timeout={1000 + (index * 200)} key={item.path}>
          <Button
            component={RouterLink}
            to={item.path}
            color={location.pathname === item.path ? 'primary' : 'inherit'}
            sx={headerStyles.navButton(location.pathname === item.path)}
            startIcon={item.icon}
          >
            {item.text}
          </Button>
        </Zoom>
      ))}
    </Box>
  );
}; 