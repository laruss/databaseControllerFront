import {TabDataStateInterface} from "../../types/redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AllObjectsResponseType, OneObjectResponseType } from "../../types/api";
import {api} from "../api/api";
import {CurrentModelType, ObjectIdType} from "../../types/common";

const initialState: TabDataStateInterface = {
    model: null,
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
        setModel: (state, action: PayloadAction<CurrentModelType>) => {
            state.model = action.payload;
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
        setCurrentObjectId: (state, action: PayloadAction<ObjectIdType>) => {
            state.objects.current.id = action.payload;
        },
        setCurrentObjectAsNew: (state) => {
            state.objects.current = initialState.objects.current;
            state.isChanged = false;
        },
        setAsChanged: (state, action: PayloadAction<boolean>) => {
            state.isChanged = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            api.endpoints.getSchemes.matchFulfilled,
            (state, {payload}) => {
                state.fields = payload;
            }
        ).addMatcher(
            api.endpoints.getAllObjects.matchFulfilled,
            (state, {payload, meta}) => {
                if (meta.arg.originalArgs.modelName === state.model)
                    state.objects.all = payload;
            }
        ).addMatcher(
            api.endpoints.getOneObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.current = {
                    ...payload,
                    id: state.objects.current.id
                };
            }
        ).addMatcher(
            api.endpoints.updateObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.current = {
                    ...payload,
                    id: state.objects.current.id
                };
                state.isChanged = false;
            }
        ).addMatcher(
            api.endpoints.createObject.matchFulfilled,
            (state, {payload}) => {
                state.objects.current = {
                    ...payload,
                    id: payload.id as string || undefined
                };
                state.isChanged = false;
            }
        )
    }
});

export const {
    setModel,
    setObjects,
    setCurrentObject,
    setCurrentObjectId,
    setCurrentObjectAsNew,
    setAsChanged
} = tabDataSlice.actions;

export default tabDataSlice.reducer;

export const selectModel = (state: {tabData: TabDataStateInterface}) => state.tabData.model;

export const selectFields = (state: {tabData: TabDataStateInterface}) => state.tabData.fields;

export const selectObjects = (state: {tabData: TabDataStateInterface}) => state.tabData.objects;

export const selectCurrentObject = (state: {tabData: TabDataStateInterface}) => state.tabData.objects.current;

export const selectIsChanged = (state: {tabData: TabDataStateInterface}) => state.tabData.isChanged;