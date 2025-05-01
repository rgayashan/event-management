import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grow,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useProfileStyles } from './profileStyles';

interface MyEventsProps {
  animationLoaded: boolean;
  userBackground: string;
}

const MyEvents: React.FC<MyEventsProps> = ({
  animationLoaded,
  userBackground,
}) => {
  const { gradientAnimation, pulseAnimation } = useProfileStyles();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          My Events
        </Typography>
      </Box>
      <Grow in={animationLoaded} timeout={1000}>
        <Paper
          elevation={2}
          sx={{
            p: 5,
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <EventIcon
            sx={{
              fontSize: 80,
              color: 'text.secondary',
              opacity: 0.6,
              mb: 2,
              animation: `${pulseAnimation} 2s infinite ease-in-out`,
            }}
          />
          <Typography variant="h6" color="text.secondary" fontWeight="medium" gutterBottom>
            You haven't created any events yet
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Start organizing your first event
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/events/new"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              background: userBackground,
              backgroundSize: '200% 200%',
              animation: `${gradientAnimation} 15s ease infinite`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            Create Event
          </Button>
        </Paper>
      </Grow>
    </Box>
  );
};

export default MyEvents; 