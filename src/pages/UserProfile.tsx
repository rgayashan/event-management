import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Box, 
  Paper,
  Divider,
  Tab,
  Tabs,
  Fade,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCurrentUser, fetchUserAttendingEvents } from '../redux/slices/userSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProfileHeader from '../components/profile/ProfileHeader';
import AttendingEvents from '../components/profile/AttendingEvents';
import MyEvents from '../components/profile/MyEvents';
import { generateRandomColor } from '../components/profile/profileStyles';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, attendingEvents, loading, error } = useAppSelector(state => state.user);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const userBackground = generateRandomColor();
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchUserAttendingEvents(currentUser.id));
    }
  }, [dispatch, currentUser]);
  
  useEffect(() => {
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
            <ProfileHeader
              user={currentUser}
              animationLoaded={animationLoaded}
              userBackground={userBackground}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Fade in={animationLoaded} timeout={1500}>
              <Box sx={{ px: 3, pb: 3 }}>
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
          </Paper>
        </Fade>
        
        {/* Tab Content */}
        <Box sx={{ mt: 4 }}>
          <Fade in={animationLoaded && tabValue === 0} timeout={1000}>
            <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
              <AttendingEvents
                events={attendingEvents}
                loading={loading}
                animationLoaded={animationLoaded}
                userBackground={userBackground}
              />
            </Box>
          </Fade>
          
          <Fade in={animationLoaded && tabValue === 1} timeout={1000}>
            <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
              <MyEvents
                animationLoaded={animationLoaded}
                userBackground={userBackground}
              />
            </Box>
          </Fade>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;