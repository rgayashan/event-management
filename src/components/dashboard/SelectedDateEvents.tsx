import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grow } from '@mui/material';
import { format } from 'date-fns';
import { Event } from '../../types';

interface SelectedDateEventsProps {
  selectedDate: Date;
  events: Event[];
}

const SelectedDateEvents: React.FC<SelectedDateEventsProps> = ({ selectedDate, events }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="medium">
        Events on {format(selectedDate, 'MMMM d, yyyy')}:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {events.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No events scheduled for this date
          </Typography>
        ) : (
          events.map((event, index) => (
            <Grow in={true} timeout={400 + (index * 100)} key={event.id}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box component={Link} to={`/events/${event.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="h6" color="primary.main">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(event.date), 'h:mm a')} • {event.location}
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          ))
        )}
      </Box>
    </Box>
  );
};

export default SelectedDateEvents; 