import React from 'react';
import { Box, Typography, Paper, IconButton, Fade } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Event } from '../../types';
import CalendarDayCell from './CalendarDayCell';
import SelectedDateEvents from './SelectedDateEvents';

interface CalendarViewProps {
  events: Event[];
  currentMonth: Date;
  selectedDate: Date | null;
  onDateClick: (day: Date) => void;
  onMonthChange: (month: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  currentMonth,
  selectedDate,
  onDateClick,
  onMonthChange
}) => {
  const prevMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const renderCalendarCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const dayOfWeekStart = monthStart.getDay();
    
    // Array of day cells for the calendar
    const dayArray: Date[] = [];
    
    // Add days from previous month
    for (let i = 0; i < dayOfWeekStart; i++) {
      const prevDay = addDays(monthStart, -dayOfWeekStart + i);
      dayArray.push(prevDay);
    }
    
    // Add all days in current month
    let day = monthStart;
    while (day <= monthEnd) {
      dayArray.push(new Date(day));
      day = addDays(day, 1);
    }
    
    // Add days from next month to fill out the calendar grid
    const daysNeeded = 42 - dayArray.length; // 6 rows of 7 days
    for (let i = 1; i <= daysNeeded; i++) {
      const nextDay = addDays(monthEnd, i);
      dayArray.push(nextDay);
    }
    
    // Render calendar rows
    const rows: React.ReactElement[] = [];
    let cells: React.ReactElement[] = [];
    
    dayArray.forEach((day, i) => {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDay(day, eventDate);
      });
      
      cells.push(
        <CalendarDayCell 
          key={i}
          day={day}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          dayEvents={dayEvents}
          onDateClick={onDateClick}
        />
      );
      
      if ((i + 1) % 7 === 0) {
        rows.push(
          <Box
            key={`row-${i}`}
            sx={{
              display: 'flex',
              width: '100%',
              mb: 1
            }}
          >
            {cells}
          </Box>
        );
        cells = [];
      }
    });
    
    return rows;
  };

  // Filter events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => {
        const eventDate = new Date(event.date);
        return isSameDay(selectedDate, eventDate);
      })
    : [];

  return (
    <Fade in={true} timeout={800}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          mb: 3,
          background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2 
          }}>
            <IconButton onClick={prevMonth} color="primary">
              <ChevronLeftIcon />
            </IconButton>
            
            <Typography variant="h6" align="center" fontWeight="medium">
              {format(currentMonth, 'MMMM yyyy')}
            </Typography>
            
            <IconButton onClick={nextMonth} color="primary">
              <ChevronRightIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ 
            borderRadius: 2, 
            overflow: 'hidden', 
            border: '1px solid',
            borderColor: 'divider'
          }}>
            {/* Calendar Header - Days of Week */}
            <Box sx={{ 
              display: 'flex', 
              bgcolor: 'background.paper',
              p: 2
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    width: 'calc(100% / 7)', 
                    textAlign: 'center'
                  }}
                >
                  <Typography align="center" fontWeight="bold">
                    {day}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            {/* Calendar Cells */}
            <Box sx={{ p: 2 }}>
              {renderCalendarCells()}
            </Box>
          </Box>
        </Box>
        
        {selectedDate && (
          <SelectedDateEvents 
            selectedDate={selectedDate}
            events={selectedDateEvents}
          />
        )}
      </Paper>
    </Fade>
  );
};

export default CalendarView; 