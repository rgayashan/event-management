// src/api/eventApi.ts
import axios, { AxiosResponse } from 'axios';
import { Event, EventFilters} from '../types';

// For development, using JSONPlaceholder as a mock API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Helper function to transform API response to our Event format
export const transformToEvent = (data: any): Event => ({
  id: data.id,
  title: data.title || `Event ${data.id}`,
  description: data.body || '',
  date: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
  host: `Host ${data.userId || 1}`,
  location: `${Math.floor(Math.random() * 100)} Event Street, City`,
  attendees: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
    id: i + 1,
    name: `Attendee ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`
  })),
  createdBy: data.userId || 1
});

export const fetchEvents = async (filters: EventFilters = {}): Promise<Event[]> => {
  try {
    // In a real API, we would pass filters as query params
    const response: AxiosResponse = await axios.get(`${BASE_URL}/posts`);
    
    // Transform and filter the data
    let events = response.data.map(transformToEvent);
    
    // Apply filters (simulation)
    if (filters.host) {
      events = events.filter((event: { host: string; }) => 
        event.host.toLowerCase().includes(filters.host!.toLowerCase())
      );
    }
    
    if (filters.date) {
      const filterDate = new Date(filters.date);
      events = events.filter((event: { date: string | number | Date; }) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === filterDate.toDateString();
      });
    }
    
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const fetchEventById = async (id: string | number): Promise<Event> => {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/posts/${id}`);
    return transformToEvent(response.data);
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
  try {
    const response: AxiosResponse = await axios.post(`${BASE_URL}/posts`, {
      title: eventData.title,
      body: eventData.description,
      userId: 1,
    });
    return transformToEvent({
      ...response.data,
      ...eventData
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string | number, eventData: Partial<Event>): Promise<Event> => {
  try {
    const response: AxiosResponse = await axios.put(`${BASE_URL}/posts/${id}`, {
      id,
      title: eventData.title,
      body: eventData.description,
      userId: 1,
    });
    return transformToEvent({
      ...response.data,
      ...eventData
    });
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};
