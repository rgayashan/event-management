import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Fade,
  Zoom,
  Avatar,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { keyframes } from '@mui/system';
import logo from '../../assets/images/logo.png';
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const Header: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const navigationItems = [
    { text: 'Dashboard', path: '/', icon: <CalendarMonthIcon fontSize="small" /> },
    { text: 'Profile', path: '/profile', icon: <PersonIcon fontSize="small" /> }
  ];
  
  return (
    <Slide direction="down" in={mounted} timeout={800}>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={scrolled ? 4 : 1}
        sx={{
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'background.paper',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          borderBottom: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            boxShadow: scrolled ? theme.shadows[6] : theme.shadows[2],
          }
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Fade in={mounted} timeout={1000}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    mr: 1,
                    animation: `${pulse} 2s infinite`,
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <img src={logo} alt="Event Manager" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.02em',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Event Manager
                </Typography>
              </Box>
            </Fade>
            
            {isMobile ? (
              <>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Zoom in={mounted} timeout={1200}>
                    <IconButton 
                      size="small"
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <Badge
                        badgeContent={3}
                        color="error"
                      >
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
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        }
                      }}
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
                  {navigationItems.map(item => (
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
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                {navigationItems.map((item, index) => (
                  <Zoom in={mounted} timeout={1000 + (index * 200)} key={item.path}>
                    <Button
                      component={RouterLink}
                      to={item.path}
                      color={location.pathname === item.path ? 'primary' : 'inherit'}
                      sx={{ 
                        mx: 0.5,
                        px: 2,
                        position: 'relative',
                        '&::after': location.pathname === item.path ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '70%',
                          height: '3px',
                          borderRadius: '3px',
                          backgroundColor: 'primary.main',
                        } : {},
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          backgroundColor: 'action.hover'
                        }
                      }}
                      startIcon={item.icon}
                    >
                      {item.text}
                    </Button>
                  </Zoom>
                ))}
                <Zoom in={mounted} timeout={1600}>
                  <IconButton 
                    size="small"
                    sx={{
                      mx: 1,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <Badge
                      badgeContent={3}
                      color="error"
                    >
                      <NotificationsIcon fontSize="small" color="action" />
                    </Badge>
                  </IconButton>
                </Zoom>
                <Zoom in={mounted} timeout={1800}>
                  <Button
                    component={RouterLink}
                    to="/profile"
                    variant="contained"
                    color="primary"
                    sx={{ 
                      ml: 1,
                      borderRadius: '20px',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      boxShadow: 3,
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.03)',
                        boxShadow: 6,
                      }
                    }}
                    startIcon={
                      <Avatar 
                        sx={{ 
                          width: 24, 
                          height: 24,
                          border: '2px solid white'
                        }}
                      >
                        <PersonIcon fontSize="small" />
                      </Avatar>
                    }
                  >
                    My Profile
                  </Button>
                </Zoom>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Header;