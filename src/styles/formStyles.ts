import { keyframes } from '@mui/system';

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const commonFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }
  }
};

export const getFieldAnimation = (index: number, animationLoaded: boolean) => ({
  opacity: animationLoaded ? 1 : 0,
  transform: animationLoaded ? 'translateY(0)' : 'translateY(20px)',
  transition: `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`
}); 