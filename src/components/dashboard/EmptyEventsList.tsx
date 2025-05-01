import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button, Box, Fade } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';

const EmptyEventsList: React.FC = () => {
  return (
    <Fade in={true} timeout={800}>
      <Paper elevation={1} sx={{ 
        textAlign: "center", 
        py: 5, 
        borderRadius: 2,
        background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'
      }}>
        <EventIcon sx={{ 
          fontSize: 80, 
          color: 'text.secondary', 
          opacity: 0.5, 
          mb: 2,
          animation: 'bounce 2s infinite ease-in-out',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }} />
        <Typography variant="h6">No events found</Typography>
        <Typography variant="body1" color="textSecondary">
          Try adjusting your filters or create a new event
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          component={Link}
          to="/events/new"
          startIcon={<AddIcon />}
          sx={{ 
            mt: 3,
            transition: 'all 0.2s',
            '&:hover': { 
              transform: 'scale(1.05)',
            },
          }}
        >
          Create New Event
        </Button>
      </Paper>
    </Fade>
  );
};

export default EmptyEventsList; 