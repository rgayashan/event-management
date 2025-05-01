import React from 'react';
import { Box, Fade, Grow } from '@mui/material';
import EventCard from '../events/EventCard';
import { Event } from '../../types';

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <Fade in={true} timeout={600}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {events.map((event, index) => (
          <Grow 
            in={true} 
            timeout={600 + (index * 100)} 
            key={event.id}
          >
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' } }}>
              <EventCard event={event} />
            </Box>
          </Grow>
        ))}
      </Box>
    </Fade>
  );
};

export default EventsList; 