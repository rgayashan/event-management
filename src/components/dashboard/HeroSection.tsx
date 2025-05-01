import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Fade, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';

interface HeroSectionProps {
  animationsLoaded: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ animationsLoaded }) => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
        mb: 4,
        borderRadius: { xs: 0, sm: '0 0 24px 24px' },
        boxShadow: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 70%)',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          top: '-150px',
          right: '-150px',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          <Fade in={animationsLoaded} timeout={800}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom sx={{ 
                background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.8))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}>
                Discover Amazing Events
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, maxWidth: '600px' }}>
                Find and join events that match your interests or create your own
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link} 
                to="/events/new"
                startIcon={<AddIcon />}
                size="large"
                sx={{ 
                  px: 3, 
                  py: 1.2, 
                  borderRadius: 2,
                  boxShadow: 4,
                  '&:hover': { 
                    transform: 'translateY(-4px)', 
                    boxShadow: 6,
                    background: theme => `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                  },
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                Create Event
              </Button>
            </Box>
          </Fade>
          <Zoom in={animationsLoaded} timeout={1000}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <EventIcon sx={{ 
                fontSize: 200, 
                opacity: 0.85,
                filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                animation: 'pulse 3s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.08)' },
                  '100%': { transform: 'scale(1)' },
                }
              }} />
            </Box>
          </Zoom>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 