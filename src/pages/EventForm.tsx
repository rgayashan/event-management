import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Button,
  Divider,
  Tooltip,
  Fade,
  Zoom,
  Alert
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchEventById, createEvent, updateEvent } from '../redux/slices/eventsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useEventForm } from '../hooks/useEventForm';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { slideIn, gradientAnimation } from '../styles/formStyles';
import EventFormHeader from '../components/EventFormHeader';
import EventFormFields from '../components/EventFormFields';

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
    const timer = setTimeout(() => setAnimationLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [dispatch, id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!validateForm()) return;

    try {
      if (isEditMode && id) {
        await dispatch(updateEvent({ id, eventData: formData })).unwrap();
        navigate(`/events/${id}`);
      } else {
        const result = await dispatch(createEvent(formData)).unwrap();
        navigate(`/events/${result.id}`);
      }
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleCancel = () => navigate(isEditMode ? `/events/${id}` : '/');

  if (isEditMode && loading) return <LoadingSpinner />;
  if (isEditMode && error) return <ErrorMessage message={error} />;

  const hasErrors = Object.values(errors).some(error => Boolean(error));

  return (
    <Container maxWidth="md">
      <Box mb={4} mt={3} sx={{ position: 'relative' }}>
        <EventFormHeader
          isEditMode={isEditMode}
          animationLoaded={animationLoaded}
          onCancel={handleCancel}
        />

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
                  sx={{ mb: 3, animation: `${slideIn} 0.5s ease-out`, borderRadius: 2 }}
                >
                  Please fix the errors in the form before submitting
                </Alert>
              </Fade>
            )}

            <form onSubmit={handleSubmit}>
              <EventFormFields
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                animationLoaded={animationLoaded}
              />

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
            </form>
          </Paper>
        </Zoom>
      </Box>
    </Container>
  );
};

export default EventForm;