"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PortalSettings = {
  _id: string;
  userId: string;
  instituteName: string;
  instituteType: "school" | "college" | "university";
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  portalPermissions: {
    adminPortal: {
      enabled: boolean;
      features: string[];
    };
    teacherPortal: {
      enabled: boolean;
      features: string[];
    };
    studentPortal: {
      enabled: boolean;
      features: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
};

type SettingsState = {
  portalSettings: PortalSettings | null;
  loading: boolean;
};

const initialState: SettingsState = {
  portalSettings: null,
  loading: false,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPortalSettings: (state, action: PayloadAction<PortalSettings | null>) => {
      state.portalSettings = action.payload;
      state.loading = false;
    },
    setSettingsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearPortalSettings: (state) => {
      state.portalSettings = null;
      state.loading = false;
    },
  },
});

export default settings.reducer;
export const { setPortalSettings, setSettingsLoading, clearPortalSettings } = settings.actions; 