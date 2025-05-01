import { keyframes } from '@mui/system';

export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const eventDetailStyles = {
  backButton: {
    mb: 2,
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateX(-4px)'
    }
  },
  headerContainer: (titleColor: string, complementaryColor: string) => ({
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
    mb: 4,
    boxShadow: 3,
    background: `linear-gradient(135deg, ${titleColor}, ${complementaryColor})`,
    backgroundSize: '200% 200%',
    animation: `${gradientAnimation} 15s ease infinite`,
  }),
  headerContent: {
    p: { xs: 3, md: 5 },
    color: 'white',
    position: 'relative',
    zIndex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  hostAvatar: {
    bgcolor: 'rgba(255,255,255,0.2)',
    mr: 1,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  chip: {
    bgcolor: 'rgba(255,255,255,0.2)',
    color: 'white',
    '& .MuiChip-icon': {
      color: 'white'
    }
  },
  actionButton: {
    bgcolor: 'rgba(255,255,255,0.2)',
    color: 'white',
    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
  },
  contentPaper: {
    p: 3,
    borderRadius: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 4,
      transform: 'translateY(-5px)'
    }
  }
}; 