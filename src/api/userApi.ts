
// src/api/userApi.ts
import axios, { AxiosResponse } from 'axios';
import { User, Event } from '../types';
import { transformToEvent } from './eventApi';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/users/1`);
    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email
    };
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Fetch events user is attending
export const getUserAttendingEvents = async (userId: number | string): Promise<Event[]> => {
  try {
    // In a real API, this would be filtered by user ID
    const response: AxiosResponse = await axios.get(`${BASE_URL}/posts`);
    // Transform and return only a subset to simulate "attending" events
    return response.data
      .slice(0, 5)
      .map(transformToEvent);
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
};