import {TabDataState} from "../../types/redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AllObjectsResponseType, OneObjectResponseType, SchemeResponseType} from "../../types/api";

const initialState: TabDataState = {
    fields: {},
    objects: {
        all: [],
        current: {
            id: null
        }
    },
    isChanged: false
};

export const tabDataSlice = createSlice({
    name: 'tabData',
    initialState,
    reducers: {
        setFields: (state, action: PayloadAction<SchemeResponseType>) => {
            state.fields = action.payload;
        },
        setObjects: (state, action: PayloadAction<AllObjectsResponseType>) => {
            state.objects.all = action.payload;
        },
        setCurrentObject: (state, action: PayloadAction<OneObjectResponseType>) => {
            state.objects.current = {
                ...action.payload,
                id: state.objects.current.id
            };
        },
        setCurrentObjectId: (state, action: PayloadAction<string | null>) => {
            state.objects.current.id = action.payload;
        },
        setCurrentObjectAsNew: (state) => {
            state.objects.current = initialState.objects.current;
            state.isChanged = false;
        },
        setAsChanged: (state, action: PayloadAction<boolean>) => {
            state.isChanged = action.payload;
        }
    }
});

export const {
    setFields,
    setObjects,
    setCurrentObject,
    setCurrentObjectId,
    setCurrentObjectAsNew,
    setAsChanged
} = tabDataSlice.actions;

export default tabDataSlice.reducer;