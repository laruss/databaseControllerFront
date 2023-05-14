import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import {AppState} from "../../types/redux";
import {api} from "../api/api";

const initialState: AppState = {
    isLoaded: false,
    models: {},
    dialog: {
        isOpen: false,
        title: '',
        text: '',
        onConfirm: () => {},
        onCancel: () => {}
    },
    notification: {
        isOpen: false,
        text: '',
        variant: 'info'
    }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoaded: (state, action: PayloadAction<boolean>) => {
            state.isLoaded = action.payload;
        },
        setDialog: (state, action: PayloadAction<AppState['dialog']>) => {
            state.dialog = action.payload;
        },
        setNotification: (state, action: PayloadAction<AppState['notification']>) => {
            state.notification = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            api.endpoints.getModels.matchFulfilled,
            (state, {payload}) => {
                state.models = payload;
            }
        )
    }
});

export const {
    setLoaded,
    setDialog,
    setNotification
} = appSlice.actions;

export const selectIsLoaded = (state: RootState) => state.app.isLoaded;

export default appSlice.reducer;

export const selectModels = (state: RootState) => state.app.models;