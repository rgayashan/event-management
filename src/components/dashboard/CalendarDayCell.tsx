import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';
import { Event } from '../../types';

interface CalendarDayCellProps {
  day: Date;
  currentMonth: Date;
  selectedDate: Date | null;
  dayEvents: Event[];
  onDateClick: (day: Date) => void;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  currentMonth,
  selectedDate,
  dayEvents,
  onDateClick,
}) => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isSelected = selectedDate && isSameDay(day, selectedDate);
  
  return (
    <Box 
      sx={{
        width: 'calc(100% / 7)',
        height: '80px',
        padding: 1,
        position: 'relative',
        cursor: isCurrentMonth ? 'pointer' : 'default',
        background: isSelected ? 'rgba(220, 0, 78, 0.1)' : 'transparent',
        border: isToday(day) ? '2px solid' : '1px solid',
        borderColor: isToday(day) ? 'primary.main' : 'divider',
        borderRadius: 1,
        opacity: isCurrentMonth ? 1 : 0.3,
        '&:hover': {
          backgroundColor: isCurrentMonth ? 'rgba(220, 0, 78, 0.05)' : 'transparent',
          transform: isCurrentMonth ? 'scale(1.05)' : 'none',
          transition: 'all 0.2s'
        },
        transition: 'all 0.2s'
      }}
      onClick={() => isCurrentMonth && onDateClick(day)}
    >
      <Typography 
        align="center" 
        sx={{ 
          fontWeight: isToday(day) ? 'bold' : 'regular'
        }}
      >
        {format(day, 'd')}
      </Typography>
      
      {dayEvents.length > 0 && (
        <Box sx={{ 
          position: 'absolute',
          bottom: 2,
          right: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Badge
            badgeContent={dayEvents.length}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.7rem',
                height: '18px',
                minWidth: '18px'
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CalendarDayCell; 