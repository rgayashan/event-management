import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CardActionArea, 
  Chip, 
  Avatar, 
  CardMedia,
  Stack,
  Paper
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

// Generates a gradient background based on event title
const getGradientBackground = (title: string) => {
  // Simple hash function to generate consistent colors for same title
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hue1 + 60) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 80%, 55%), hsl(${hue2}, 80%, 65%))`;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  const formattedTime = format(new Date(event.date), 'h:mm a');
  const gradientBg = getGradientBackground(event.title);
  
  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        },
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <CardActionArea 
        component={Link} 
        to={`/events/${event.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          sx={{
            height: 120,
            background: 'linear-gradient(to bottom,lightblue,darkblue, lightblue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            align="center" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              textShadow: '0px 1px 3px rgba(0,0,0,0.3)',
              px: 2
            }}
          >
            {event.title}
          </Typography>
        </CardMedia>
          
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon color="action" fontSize="small" />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  {formattedDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formattedTime}
                </Typography>
              </Box>
            </Stack>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon color="action" fontSize="small" />
              <Typography variant="body2" color="textSecondary" noWrap>
                {event.location}
              </Typography>
            </Stack>
            
            <Typography 
              variant="body1" 
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                mt: 1,
                mb: 2,
                lineHeight: 1.4,
                minHeight: '4.2em'
              }}
            >
              {event.description}
            </Typography>
            
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    mr: 1, 
                    bgcolor: gradientBg,
                    fontSize: '0.8rem'
                  }}
                >
                  {event.host.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" noWrap sx={{ maxWidth: 100 }}>
                  {event.host}
                </Typography>
              </Box>
              
              <Chip 
                icon={<PeopleIcon />}
                label={`${event.attendees.length}`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;