// src/types/index.ts

// Core entity types
export interface Event {
    id: number | string;
    title: string;
    description: string;
    date: string;
    host: string;
    location: string;
    attendees: Attendee[];
    createdBy?: number | string;
  }
  
  export interface Attendee {
    id: number | string;
    name: string;
    avatar?: string;
  }
  
  export interface User {
    id: number | string;
    name: string;
    email: string;
  }
  
  // State interfaces
  export interface EventsState {
    events: Event[];
    currentEvent: Event | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface UserState {
    currentUser: User | null;
    attendingEvents: Event[];
    loading: boolean;
    error: string | null;
  }
  
  // Filter interfaces
  export interface EventFilters {
    host?: string;
    date?: string;
  }
  
  // API response types
  export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
  }