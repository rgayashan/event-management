import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { EventFilters } from '../../types';

interface FilterBarProps {
  filters: EventFilters;
  onFilterChange: (filters: Partial<EventFilters>) => void;
  onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };
  
  return (
    <Box mb={3} p={2} bgcolor="background.paper" borderRadius={1}>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2,
        alignItems: 'center' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(40% - 8px)' } }}>
          <TextField
            fullWidth
            name="host"
            label="Filter by Host"
            value={filters.host || ''}
            onChange={handleChange}
            size="small"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(40% - 8px)' } }}>
          <TextField
            fullWidth
            type="date"
            name="date"
            label="Filter by Date"
            value={filters.date || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(20% - 8px)' } }}>
          <Button 
            fullWidth 
            variant="outlined" 
            onClick={onResetFilters}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBar;