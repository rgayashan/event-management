import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Button, Fade } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchEventById } from '../redux/slices/eventsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { EventHeader } from '../components/events/detail/EventHeader';
import { EventContent } from '../components/events/detail/EventContent';
import { eventDetailStyles } from '../components/events/detail/styles';

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
              sx={eventDetailStyles.backButton}
            >
              Back
            </Button>

            <EventHeader
              title={currentEvent.title}
              host={currentEvent.host}
              date={formattedDate}
              time={formattedTime}
              location={currentEvent.location}
              titleColor={titleColor}
              complementaryColor={complementaryColor}
              animationLoaded={animationLoaded}
              liked={liked}
              onShare={handleShare}
              onLike={toggleLike}
              onEdit={handleEdit}
            />

            <EventContent
              description={currentEvent.description}
              attendees={currentEvent.attendees}
              titleColor={titleColor}
              complementaryColor={complementaryColor}
              animationLoaded={animationLoaded}
            />
          </Box>
        </Fade>
      </Box>
    </Container>
  );
};

export default EventDetail;