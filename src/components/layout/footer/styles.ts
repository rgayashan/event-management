import { keyframes } from '@mui/system';

export const iconHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

export const footerStyles = {
  footer: {
    mt: 'auto',
    pt: 6,
    pb: 3,
    bgcolor: 'background.paper',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
    borderTop: '1px solid',
    borderColor: 'divider',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200px',
      height: '4px',
      background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
      borderRadius: '0 0 8px 8px',
    }
  },
  gradientText: {
    fontWeight: 'bold',
    mb: 2,
    background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  socialIcon: {
    color: 'text.secondary',
    transition: 'all 0.2s',
    '&:hover': {
      color: 'primary.main',
      animation: `${iconHover} 0.5s ease`,
    }
  },
  quickLink: {
    transition: 'all 0.2s',
    '&:hover': {
      color: 'primary.main',
      pl: 0.5,
    }
  }
}; 