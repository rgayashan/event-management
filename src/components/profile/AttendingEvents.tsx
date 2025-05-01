import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  Grow,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import { Event } from '../../types';
import EventCard from '../events/EventCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useProfileStyles } from './profileStyles';

interface AttendingEventsProps {
  events: Event[];
  loading: boolean;
  animationLoaded: boolean;
  userBackground: string;
}

const AttendingEvents: React.FC<AttendingEventsProps> = ({
  events,
  loading,
  animationLoaded,
  userBackground,
}) => {
  const { gradientAnimation, pulseAnimation } = useProfileStyles();

  if (loading) return <LoadingSpinner />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          Events You're Attending
        </Typography>
        <Chip
          icon={<EventAvailableIcon />}
          label={`${events.length} Events`}
          color="primary"
          sx={{
            fontWeight: 'medium',
            background: userBackground,
            backgroundSize: '200% 200%',
            animation: `${gradientAnimation} 15s ease infinite`,
          }}
        />
      </Box>

      {events.length === 0 ? (
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
              You're not attending any events yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Browse events and join ones that interest you
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
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
              Discover Events
            </Button>
          </Paper>
        </Grow>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {events.map((event: Event, index) => (
            <Grow
              key={event.id}
              in={animationLoaded}
              timeout={800 + (index * 150)}
              style={{ transformOrigin: 'center top' }}
            >
              <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' } }}>
                <EventCard event={event} />
              </Box>
            </Grow>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AttendingEvents; 