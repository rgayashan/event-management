import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  Badge, 
  Box,
  Zoom,
  Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { navigationConfig } from './NavigationItems';
import { headerStyles } from './styles/HeaderStyles';

interface MobileMenuProps {
  mounted: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ mounted }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Zoom in={mounted} timeout={1200}>
          <IconButton size="small" sx={headerStyles.iconButton}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="small" color="action" />
            </Badge>
          </IconButton>
        </Zoom>
        <Zoom in={mounted} timeout={1400}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={headerStyles.iconButton}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
        TransitionComponent={Fade}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: 3
          }
        }}
      >
        {navigationConfig.map(item => (
          <MenuItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleMenuClose}
            selected={location.pathname === item.path}
            sx={{
              gap: 1.5,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'translateX(5px)'
              }
            }}
          >
            {item.icon}
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}; 