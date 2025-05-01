import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

const SplashScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: `${fadeIn} 0.5s ease-in-out`,
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          animation: `${scaleIn} 0.5s ease-in-out`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '100%',
          gap: 2,
        }}
      >
        {/* You can replace this with your app logo */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
          }}
        >
          Event Manager
        </Typography>
        <CircularProgress size={48} color="primary" />
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mt: 2,
          }}
        >
          Loading amazing events...
        </Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen; 