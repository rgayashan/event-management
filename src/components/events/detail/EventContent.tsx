import React from 'react';
import { Box, Typography, Paper, Divider, Chip, Grow } from '@mui/material';
import AttendeeList from '../../events/AttendeeList';
import { eventDetailStyles } from './styles';

interface EventContentProps {
  description: string;
  attendees: any[];
  titleColor: string;
  complementaryColor: string;
  animationLoaded: boolean;
}

export const EventContent: React.FC<EventContentProps> = ({
  description,
  attendees,
  titleColor,
  complementaryColor,
  animationLoaded
}) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
    <Box sx={{ width: { xs: '100%', md: '66.67%' }, px: 1.5, mb: 3 }}>
      <Grow in={animationLoaded} timeout={1200}>
        <Paper elevation={2} sx={eventDetailStyles.contentPaper}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: titleColor,
              fontWeight: 'medium'
            }}
          >
            About this event
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body1"
            paragraph
            sx={{
              lineHeight: 1.7,
              fontSize: '1.05rem'
            }}
          >
            {description}
          </Typography>
        </Paper>
      </Grow>
    </Box>

    <Box sx={{ width: { xs: '100%', md: '33.33%' }, px: 1.5, mb: 3 }}>
      <Grow in={animationLoaded} timeout={1400}>
        <Paper elevation={2} sx={eventDetailStyles.contentPaper}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              variant="h5"
              sx={{
                color: titleColor,
                fontWeight: 'medium'
              }}
            >
              Attendees
            </Typography>
            <Chip
              label={attendees.length}
              color="primary"
              sx={{
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${titleColor}, ${complementaryColor})`,
              }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <AttendeeList attendees={attendees} />
        </Paper>
      </Grow>
    </Box>
  </Box>
); 