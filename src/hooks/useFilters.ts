import { useState } from 'react';
import { EventFilters } from '../types';

export const useFilters = (initialFilters: EventFilters = {}) => {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  
  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const resetFilters = () => {
    setFilters({});
  };
  
  return {
    filters,
    updateFilters,
    resetFilters
  };
};