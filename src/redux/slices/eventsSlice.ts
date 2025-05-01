import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventsState, EventFilters } from '../../types';
import * as eventApi from '../../api/eventApi';

const initialState: EventsState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters: EventFilters = {}, { rejectWithValue }) => {
    try {
      return await eventApi.fetchEvents(filters);
    } catch (error) {
      return rejectWithValue('Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await eventApi.fetchEventById(id);
    } catch (error) {
      return rejectWithValue('Failed to fetch event details');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData: Partial<Event>, { rejectWithValue }) => {
    try {
      return await eventApi.createEvent(eventData);
    } catch (error) {
      return rejectWithValue('Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, eventData }: { id: string | number; eventData: Partial<Event> }, { rejectWithValue }) => {
    try {
      return await eventApi.updateEvent(id, eventData);
    } catch (error) {
      return rejectWithValue('Failed to update event');
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events cases
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch event by ID cases
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create event cases
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update event cases
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        const updatedEvent = action.payload;
        const index = state.events.findIndex(event => event.id === updatedEvent.id);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
        if (state.currentEvent?.id === updatedEvent.id) {
          state.currentEvent = updatedEvent;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;