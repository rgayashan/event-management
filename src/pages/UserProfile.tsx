import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar,
  Button,
  Divider,
  Chip,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Grow,
  Slide
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCurrentUser, fetchUserAttendingEvents } from '../redux/slices/userSlice';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Event } from '../types';
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, attendingEvents, loading, error } = useAppSelector(state => state.user);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserAttendingEvents(currentUser.id));
    }
  }, [dispatch, currentUser]);
  
  useEffect(() => {
    // Trigger animations after initial render
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  if (loading && !currentUser) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentUser) return <ErrorMessage message="User not found" />;
  
  // Generate random colors for visual interest
  const generateRandomColor = () => {
    const colors = [
      'linear-gradient(135deg, #6a11cb, #2575fc)',
      'linear-gradient(135deg, #ff416c, #ff4b2b)',
      'linear-gradient(135deg, #56ab2f, #a8e063)',
      'linear-gradient(135deg, #614385, #516395)',
      'linear-gradient(135deg, #eecda3, #ef629f)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const userBackground = generateRandomColor();
  
  return (
    <Container maxWidth="lg">
      <Box mb={5} mt={3}>
        <Fade in={animationLoaded} timeout={800}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            }}
          >
            {/* Hero Banner */}
            <Box 
              sx={{ 
                height: '160px', 
                background: userBackground,
                backgroundSize: '200% 200%',
                animation: `${gradientAnimation} 15s ease infinite`,
                position: 'relative'
              }}
            >
              <Slide direction="down" in={animationLoaded} timeout={800}>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: '30%',
                    right: '5%',
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Tooltip title="Edit Profile">
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,0.3)',
                          transform: 'translateY(-3px)'
                        },
                        transition: 'all 0.3s'
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Settings">
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,0.3)',
                          transform: 'translateY(-3px)'
                        },
                        transition: 'all 0.3s'
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Slide>
              <Zoom in={animationLoaded} timeout={1000}>
                <Avatar 
                  sx={{ 
                    position: 'absolute',
                    bottom: '-40px',
                    left: { xs: '50%', sm: '40px' },
                    transform: { xs: 'translateX(-50%)', sm: 'translateX(0)' },
                    width: 96, 
                    height: 96,
                    border: '4px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    background: userBackground,
                    backgroundSize: '200% 200%',
                    animation: `${gradientAnimation} 15s ease infinite`,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Zoom>
            </Box>
            
            {/* User Info */}
            <Box 
              sx={{ 
                p: 3, 
                pt: { xs: 6, sm: 3 },
                pl: { xs: 3, sm: '160px' },
                textAlign: { xs: 'center', sm: 'left' },
                mt: { xs: 3, sm: 0 }
              }}
            >
              <Slide direction="right" in={animationLoaded} timeout={1200}>
                <Box>
                  <Typography 
                    variant="h4" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 0.5,
                    }}
                  >
                    {currentUser.name}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      mb: 2,
                      justifyContent: { xs: 'center', sm: 'flex-start' }
                    }}
                  >
                    <EmailIcon color="action" fontSize="small" />
                    <Typography variant="body1" color="text.secondary">
                      {currentUser.email}
                    </Typography>
                  </Box>
                </Box>
              </Slide>
              
              <Divider sx={{ my: 3 }} />
              
              <Fade in={animationLoaded} timeout={1500}>
                <Box>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ 
                      mb: 3,
                      '& .MuiTab-root': {
                        minWidth: 'auto',
                        px: 3,
                        fontWeight: 'medium',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }
                    }}
                  >
                    <Tab 
                      icon={<EventAvailableIcon />} 
                      iconPosition="start" 
                      label="Attending Events" 
                    />
                    <Tab 
                      icon={<EventIcon />} 
                      iconPosition="start" 
                      label="My Events" 
                    />
                  </Tabs>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Fade>
        
        {/* Tab Content */}
        <Box sx={{ mt: 4 }}>
          <Fade in={animationLoaded && tabValue === 0} timeout={1000}>
            <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" fontWeight="medium">
                  Events You're Attending
                </Typography>
                <Chip 
                  icon={<EventAvailableIcon />}
                  label={`${attendingEvents.length} Events`}
                  color="primary"
                  sx={{ 
                    fontWeight: 'medium',
                    background: userBackground,
                    backgroundSize: '200% 200%',
                    animation: `${gradientAnimation} 15s ease infinite`,
                  }}
                />
              </Box>
              
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {attendingEvents.length === 0 ? (
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
                      {attendingEvents.map((event: Event, index) => (
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
                </>
              )}
            </Box>
          </Fade>
          
          <Fade in={animationLoaded && tabValue === 1} timeout={1000}>
            <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
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
          </Fade>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;