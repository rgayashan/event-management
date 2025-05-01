import { keyframes } from '@mui/system';
import { Theme } from '@mui/material';

export const pulse = keyframes`
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

export const headerStyles = {
  appBar: (scrolled: boolean, theme: Theme) => ({
    bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'background.paper',
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    transition: 'all 0.3s ease-in-out',
    borderBottom: '1px solid',
    borderColor: 'divider',
    '&:hover': {
      boxShadow: scrolled ? theme.shadows[6] : theme.shadows[2],
    }
  }),

  logo: {
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
  },

  title: {
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
  },

  navButton: (isActive: boolean) => ({
    mx: 0.5,
    px: 2,
    position: 'relative',
    '&::after': isActive ? {
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
  }),

  iconButton: {
    bgcolor: 'background.paper',
    boxShadow: 1,
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 2
    }
  },

  profileButton: {
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
  }
}; 