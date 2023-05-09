import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "../store";
import {AppState} from "../../types/redux";
import {ModelsResponseType} from "../../types/api";

const initialState: AppState = {
    isLoaded: false,
    models: {},
    currentModel: null,
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
        setModels: (state, action: PayloadAction<ModelsResponseType>) => {
            state.models = action.payload;
        },
        setCurrentModel: (state, action: PayloadAction<string>) => {
            state.currentModel = action.payload;
        },
        setDialog: (state, action: PayloadAction<AppState['dialog']>) => {
            state.dialog = action.payload;
        },
        setNotification: (state, action: PayloadAction<AppState['notification']>) => {
            state.notification = action.payload;
        }
    }
});

export const {
    setLoaded,
    setModels,
    setCurrentModel,
    setDialog,
    setNotification
} = appSlice.actions;

export const selectIsLoaded = (state: RootState) => state.app.isLoaded;

export default appSlice.reducer;