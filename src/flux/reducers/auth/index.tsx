"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  dob: string;
  gender: string;
  role: string;
  about: {
    city: string;
    country: string;
    images: Array<string>;
    notifications: string;
    preferredGender: string;
    userId: string;
    _id: string;
    profilePic: string;
    interestsTags: Array<string>;
    lookingForTags: Array<string>;
    photos: Array<string>;
  };
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean; // Flag to track the loading state
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false, // Initial state assumes no loading
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      // Set user and token from payload and reset loading state
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      state.loading = false; // Reset loading state after setting user
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // Set the loading flag when an authentication request starts/ends
      state.loading = action.payload;
    },
    clearUser: (state) => {
      // Clear user and token, reset loading state
      state.user = null;
      state.token = null;
      state.loading = false;
    },
  },
});

export default auth.reducer;
export const { setUser, setLoading, clearUser } = auth.actions;
