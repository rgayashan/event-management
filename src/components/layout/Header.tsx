import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  useMediaQuery,
  useTheme,
  Slide,
  Fade,
  Button,
  Avatar,
  IconButton,
  Badge
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavigationItems } from './NavigationItems';
import { MobileMenu } from './MobileMenu';
import { headerStyles } from './styles/HeaderStyles';
import logo from '../../assets/images/logo.png';
import { Zoom } from '@mui/material';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Slide direction="down" in={mounted} timeout={800}>
      <AppBar position="sticky" color="default" elevation={scrolled ? 4 : 1} sx={headerStyles.appBar(scrolled, theme)}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Fade in={mounted} timeout={1000}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box component="span" sx={headerStyles.logo}>
                  <img src={logo} alt="Event Manager" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Typography variant="h6" component={RouterLink} to="/" sx={headerStyles.title}>
                  Event Manager
                </Typography>
              </Box>
            </Fade>
            
            {isMobile ? (
              <MobileMenu mounted={mounted} />
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <NavigationItems mounted={mounted} />
                <Zoom in={mounted} timeout={1600}>
                  <IconButton size="small" sx={headerStyles.iconButton}>
                    <Badge badgeContent={3} color="error">
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
                    sx={headerStyles.profileButton}
                    startIcon={
                      <Avatar sx={{ width: 24, height: 24, border: '2px solid white' }}>
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