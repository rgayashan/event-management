import React from 'react';
import { Typography, Box, Button, Slide } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { gradientAnimation } from '../styles/formStyles';

interface EventFormHeaderProps {
  isEditMode: boolean;
  animationLoaded: boolean;
  onCancel: () => void;
}

const EventFormHeader: React.FC<EventFormHeaderProps> = ({
  isEditMode,
  animationLoaded,
  onCancel
}) => {
  return (
    <Slide direction="down" in={animationLoaded} timeout={600}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onCancel}
          sx={{ 
            mb: 2,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateX(-4px)'
            }
          }}
        >
          Back
        </Button>
        
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{
            fontWeight: 'bold',
            background: isEditMode 
              ? 'linear-gradient(45deg, #3f51b5, #2196f3)'
              : 'linear-gradient(45deg, #7b1fa2, #e91e63)',
            backgroundSize: '200% 200%',
            animation: `${gradientAnimation} 15s ease infinite`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1
          }}
        >
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {isEditMode 
            ? 'Update your event details below'
            : 'Fill in the form below to create a new event'}
        </Typography>
      </Box>
    </Slide>
  );
};

export default EventFormHeader; 