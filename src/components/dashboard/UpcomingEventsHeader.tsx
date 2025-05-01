import React from 'react';
import { Box, Typography, Paper, Divider, Tabs, Tab, Grow } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterBar from '../events/FilterBar';
import { EventFilters } from '../../types';

interface UpcomingEventsHeaderProps {
  view: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
  onResetFilters: () => void;
  animationsLoaded: boolean;
}

const UpcomingEventsHeader: React.FC<UpcomingEventsHeaderProps> = ({
  view,
  onViewChange,
  filters,
  onFilterChange,
  onResetFilters,
  animationsLoaded
}) => {
  return (
    <Grow in={animationsLoaded} timeout={600}>
      <Box mb={4}>
        <Paper elevation={2} sx={{ 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ mr: 1 }} /> Upcoming Events
            </Typography>
            
            <Box sx={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <Tabs 
                value={view} 
                onChange={(_, newValue) => onViewChange(newValue)}
                variant="fullWidth"
                indicatorColor="secondary"
              >
                <Tab 
                  value="list" 
                  icon={<ViewListIcon />} 
                  iconPosition="start"
                  label="List"
                  sx={{ minWidth: '110px' }}
                />
                <Tab 
                  value="calendar" 
                  icon={<CalendarMonthIcon />} 
                  iconPosition="start"
                  label="Calendar"
                  sx={{ minWidth: '110px' }}
                />
              </Tabs>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          
          <FilterBar 
            filters={filters} 
            onFilterChange={onFilterChange} 
            onResetFilters={onResetFilters} 
          />
        </Paper>
      </Box>
    </Grow>
  );
};

export default UpcomingEventsHeader; 