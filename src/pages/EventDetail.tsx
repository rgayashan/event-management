import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Divider, 
  Chip,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  Grow,
  Zoom,
  Slide
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchEventById } from '../redux/slices/eventsSlice';
import AttendeeList from '../components/events/AttendeeList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { keyframes } from '@mui/system';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentEvent, loading, error } = useAppSelector(state => state.events);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    // Trigger animations after initial render
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleShare = () => {
    if (navigator.share && currentEvent) {
      navigator.share({
        title: currentEvent.title,
        text: `Check out this event: ${currentEvent.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Could not share', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      alert('Sharing link copied to clipboard!');
    }
  };
  
  const toggleLike = () => {
    setLiked(!liked);
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentEvent) return <ErrorMessage message="Event not found" />;
  
  const formattedDate = format(new Date(currentEvent.date), 'EEEE, MMMM dd, yyyy');
  const formattedTime = format(new Date(currentEvent.date), 'h:mm a');
  
  // Generate a gradient based on the event title (for visual variety)
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };
  
  const titleColor = stringToColor(currentEvent.title);
  const complementaryColor = `hsl(${(parseInt(titleColor.slice(1), 16) % 360) + 180}, 80%, 60%)`;
  
  return (
    <Container maxWidth="md">
      <Box mb={5} mt={3}>
        <Fade in={animationLoaded} timeout={800}>
          <Box>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
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
            
            <Box 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                mb: 4,
                boxShadow: 3,
                background: `linear-gradient(135deg, ${titleColor}, ${complementaryColor})`,
                backgroundSize: '200% 200%',
                animation: `${gradientAnimation} 15s ease infinite`,
              }}
            >
              <Box 
                sx={{ 
                  p: { xs: 3, md: 5 },
                  color: 'white',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Slide direction="down" in={animationLoaded} timeout={800}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {currentEvent.title}
                  </Typography>
                </Slide>
                
                <Slide direction="right" in={animationLoaded} timeout={1000}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        mr: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">
                      Hosted by {currentEvent.host}
                    </Typography>
                  </Box>
                </Slide>
                
                <Slide direction="right" in={animationLoaded} timeout={1200}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' }, 
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2,
                      mt: 2
                    }}
                  >
                    <Chip 
                      icon={<CalendarTodayIcon />} 
                      label={formattedDate}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                    <Chip 
                      icon={<AccessTimeIcon />} 
                      label={formattedTime}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                    <Chip 
                      icon={<LocationOnIcon />} 
                      label={currentEvent.location}
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                  </Box>
                </Slide>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    position: 'absolute',
                    top: { xs: 10, md: 20 },
                    right: { xs: 10, md: 20 },
                  }}
                >
                  <Zoom in={animationLoaded} timeout={1400}>
                    <Tooltip title="Like">
                      <IconButton 
                        onClick={toggleLike}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: liked ? 'error.light' : 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                          animation: liked ? `${pulse} 0.5s ease-in-out` : 'none'
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                  <Zoom in={animationLoaded} timeout={1600}>
                    <Tooltip title="Share">
                      <IconButton 
                        onClick={handleShare} 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                  <Zoom in={animationLoaded} timeout={1800}>
                    <Tooltip title="Edit Event">
                      <IconButton 
                        onClick={handleEdit} 
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Zoom>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          <Box sx={{ width: { xs: '100%', md: '66.67%' }, px: 1.5, mb: 3 }}>
            <Grow in={animationLoaded} timeout={1200}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
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
                  {currentEvent.description}
                </Typography>
              </Paper>
            </Grow>
          </Box>
          
          <Box sx={{ width: { xs: '100%', md: '33.33%' }, px: 1.5, mb: 3 }}>
            <Grow in={animationLoaded} timeout={1400}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
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
                    label={currentEvent.attendees.length} 
                    color="primary" 
                    sx={{ 
                      fontWeight: 'bold',
                      background: `linear-gradient(45deg, ${titleColor}, ${complementaryColor})`,
                    }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <AttendeeList attendees={currentEvent.attendees} />
              </Paper>
            </Grow>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EventDetail;