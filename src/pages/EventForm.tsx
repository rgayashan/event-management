import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  IconButton,
  Stack,
  Divider,
  InputAdornment,
  Tooltip,
  Fade,
  Grow,
  Zoom,
  Slide,
  Alert
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchEventById, createEvent, updateEvent } from '../redux/slices/eventsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useEventForm } from '../hooks/useEventForm';
import TitleIcon from '@mui/icons-material/Title';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@mui/system';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const EventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentEvent, loading, error } = useAppSelector(state => state.events);
  const isEditMode = Boolean(id);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  const { formData, errors, handleChange, validateForm } = useEventForm(
    isEditMode && currentEvent ? currentEvent : undefined
  );
  
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id, isEditMode]);
  
  useEffect(() => {
    // Trigger animations after initial render
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditMode && id) {
        await dispatch(updateEvent({ id, eventData: formData })).unwrap();
      } else {
        await dispatch(createEvent(formData)).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };
  
  const handleCancel = () => {
    navigate(isEditMode ? `/events/${id}` : '/');
  };
  
  const getFieldAnimation = (index: number) => ({
    opacity: animationLoaded ? 1 : 0,
    transform: animationLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`
  });
  
  if (isEditMode && loading) return <LoadingSpinner />;
  if (isEditMode && error) return <ErrorMessage message={error} />;
  
  const hasErrors = Object.values(errors).some(error => Boolean(error));
  
  return (
    <Container maxWidth="md">
      <Box mb={4} mt={3} sx={{ position: 'relative' }}>
        <Slide direction="down" in={animationLoaded} timeout={600}>
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleCancel}
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
        
        <Zoom in={animationLoaded} timeout={800}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 3,
              background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '6px',
                background: isEditMode 
                  ? 'linear-gradient(to right, #3f51b5, #2196f3)'
                  : 'linear-gradient(to right, #7b1fa2, #e91e63)',
                backgroundSize: '200% 200%',
                animation: `${gradientAnimation} 15s ease infinite`,
              }
            }}
          >
            {submitAttempted && hasErrors && (
              <Fade in={true} timeout={1000}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3, 
                    animation: `${slideIn} 0.5s ease-out`,
                    borderRadius: 2
                  }}
                >
                  Please fix the errors in the form before submitting
                </Alert>
              </Fade>
            )}
            
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Box sx={{ ...getFieldAnimation(0) }}>
                  <TextField
                    fullWidth
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon color={errors.title ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ ...getFieldAnimation(1) }}>
                  <TextField
                    fullWidth
                    label="Event Date & Time"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleChange}
                    error={Boolean(errors.date)}
                    helperText={errors.date}
                    InputLabelProps={{ shrink: true }}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon color={errors.date ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ ...getFieldAnimation(2) }}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    error={Boolean(errors.location)}
                    helperText={errors.location}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon color={errors.location ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ ...getFieldAnimation(3) }}>
                  <TextField
                    fullWidth
                    label="Host"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    error={Boolean(errors.host)}
                    helperText={errors.host}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color={errors.host ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ ...getFieldAnimation(4) }}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon color={errors.description ? "error" : "primary"} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }
                      }
                    }}
                  />
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box 
                  sx={{
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 2,
                    ...getFieldAnimation(5)
                  }}
                >
                  <Tooltip title="Cancel">
                    <Button 
                      variant="outlined" 
                      onClick={handleCancel}
                      startIcon={<CancelIcon />}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Tooltip>
                  <Tooltip title={isEditMode ? "Save Changes" : "Create Event"}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      disabled={loading}
                      startIcon={<SaveIcon />}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        background: isEditMode 
                          ? 'linear-gradient(45deg, #3f51b5, #2196f3)'
                          : 'linear-gradient(45deg, #7b1fa2, #e91e63)',
                        backgroundSize: '200% 200%',
                        animation: `${gradientAnimation} 15s ease infinite`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      {isEditMode ? 'Update Event' : 'Create Event'}
                    </Button>
                  </Tooltip>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Zoom>
      </Box>
    </Container>
  );
};

export default EventForm;