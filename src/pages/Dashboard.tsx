import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchEvents } from '../redux/slices/eventsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useFilters } from '../hooks/useFilters';
import { format } from 'date-fns';

// Imported components
import HeroSection from '../components/dashboard/HeroSection';
import UpcomingEventsHeader from '../components/dashboard/UpcomingEventsHeader';
import EmptyEventsList from '../components/dashboard/EmptyEventsList';
import EventsList from '../components/dashboard/EventsList';
import CalendarView from '../components/dashboard/CalendarView';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(state => state.events);
  const { filters, updateFilters, resetFilters } = useFilters();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    filters.date ? new Date(filters.date) : null
  );
  
  useEffect(() => {
    dispatch(fetchEvents(filters));
  }, [dispatch, filters]);
  
  useEffect(() => {
    // Trigger animations after initial render
    setAnimationsLoaded(true);
  }, []);
  
  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    const formattedDate = format(day, 'yyyy-MM-dd');
    updateFilters({ date: formattedDate });
  };
  
  const handleViewChange = (newView: 'list' | 'calendar') => {
    setView(newView);
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };
  
  return (
    <>
      <HeroSection animationsLoaded={animationsLoaded} />

      <Container maxWidth="lg">
        <UpcomingEventsHeader 
          view={view}
          onViewChange={handleViewChange}
          filters={filters}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
          animationsLoaded={animationsLoaded}
        />
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <EmptyEventsList />
            ) : (
              <>
                {view === 'list' ? (
                  <EventsList events={events} />
                ) : (
                  <CalendarView 
                    events={events}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={handleDateClick}
                    onMonthChange={handleMonthChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard;