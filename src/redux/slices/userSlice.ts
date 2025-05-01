import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState, Event } from '../../types';
import * as userApi from '../../api/userApi';

const initialState: UserState = {
  currentUser: null,
  attendingEvents: [],
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await userApi.getCurrentUser();
    } catch (error) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const fetchUserAttendingEvents = createAsyncThunk(
  'user/fetchUserAttendingEvents',
  async (userId: number | string, { rejectWithValue }) => {
    try {
      return await userApi.getUserAttendingEvents(userId);
    } catch (error) {
      return rejectWithValue('Failed to fetch user events');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchUserAttendingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAttendingEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.attendingEvents = action.payload;
      })
      .addCase(fetchUserAttendingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;