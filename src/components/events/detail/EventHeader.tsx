import React from 'react';
import { Box, Typography, Avatar, Chip, IconButton, Tooltip, Slide, Zoom } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { eventDetailStyles, pulse } from './styles';

interface EventHeaderProps {
  title: string;
  host: string;
  date: string;
  time: string;
  location: string;
  titleColor: string;
  complementaryColor: string;
  animationLoaded: boolean;
  liked: boolean;
  onShare: () => void;
  onLike: () => void;
  onEdit: () => void;
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  host,
  date,
  time,
  location,
  titleColor,
  complementaryColor,
  animationLoaded,
  liked,
  onShare,
  onLike,
  onEdit
}) => (
  <Box sx={eventDetailStyles.headerContainer(titleColor, complementaryColor)}>
    <Box sx={eventDetailStyles.headerContent}>
      <Slide direction="down" in={animationLoaded} timeout={800}>
        <Typography variant="h3" component="h1" gutterBottom sx={eventDetailStyles.eventTitle}>
          {title}
        </Typography>
      </Slide>

      <Slide direction="right" in={animationLoaded} timeout={1000}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={eventDetailStyles.hostAvatar}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6">
            Hosted by {host}
          </Typography>
        </Box>
      </Slide>

      <Slide direction="right" in={animationLoaded} timeout={1200}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 2 }}>
          <Chip icon={<CalendarTodayIcon />} label={date} sx={eventDetailStyles.chip} />
          <Chip icon={<AccessTimeIcon />} label={time} sx={eventDetailStyles.chip} />
          <Chip icon={<LocationOnIcon />} label={location} sx={eventDetailStyles.chip} />
        </Box>
      </Slide>

      <Box sx={{ display: 'flex', gap: 1, position: 'absolute', top: { xs: 10, md: 20 }, right: { xs: 10, md: 20 } }}>
        <Zoom in={animationLoaded} timeout={1400}>
          <Tooltip title="Like">
            <IconButton
              onClick={onLike}
              sx={{
                ...eventDetailStyles.actionButton,
                color: liked ? 'error.light' : 'white',
                animation: liked ? `${pulse} 0.5s ease-in-out` : 'none'
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
        <Zoom in={animationLoaded} timeout={1600}>
          <Tooltip title="Share">
            <IconButton onClick={onShare} sx={eventDetailStyles.actionButton}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
        <Zoom in={animationLoaded} timeout={1800}>
          <Tooltip title="Edit Event">
            <IconButton onClick={onEdit} sx={eventDetailStyles.actionButton}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Zoom>
      </Box>
    </Box>
  </Box>
); 