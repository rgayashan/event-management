import { keyframes } from '@mui/system';

export const useProfileStyles = () => {
  const gradientAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  const pulseAnimation = keyframes`
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  `;

  return {
    gradientAnimation,
    pulseAnimation,
  };
};

export const generateRandomColor = () => {
  const colors = [
    'linear-gradient(135deg, #6a11cb, #2575fc)',
    'linear-gradient(135deg, #ff416c, #ff4b2b)',
    'linear-gradient(135deg, #56ab2f, #a8e063)',
    'linear-gradient(135deg, #614385, #516395)',
    'linear-gradient(135deg, #eecda3, #ef629f)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 