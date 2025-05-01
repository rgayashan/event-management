import { useState, useEffect } from 'react';
import { Event } from '../types';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  host: string;
};

type EventFormErrors = {
  [K in keyof EventFormData]?: string;
};

export const useEventForm = (initialEvent?: Partial<Event>) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: initialEvent?.title || '',
    description: initialEvent?.description || '',
    date: initialEvent?.date ? new Date(initialEvent.date).toISOString().substring(0, 16) : '',
    location: initialEvent?.location || '',
    host: initialEvent?.host || '',
  });
  
  const [errors, setErrors] = useState<EventFormErrors>({});
  
  useEffect(() => {
    if (initialEvent) {
      setFormData({
        title: initialEvent.title || '',
        description: initialEvent.description || '',
        date: initialEvent.date ? new Date(initialEvent.date).toISOString().substring(0, 16) : '',
        location: initialEvent.location || '',
        host: initialEvent.host || '',
      });
    }
  }, [initialEvent]);
  
  const validateForm = (): boolean => {
    const newErrors: EventFormErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.host.trim()) newErrors.host = 'Host is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof EventFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  return {
    formData,
    errors,
    handleChange,
    validateForm,
    setFormData
  };
};
