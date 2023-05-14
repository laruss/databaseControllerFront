import {setNotification} from "../app/slices/appSlice";
import {SchemeResponseType} from "../types/api";
import {
    setCurrentObject,
    setCurrentObjectAsNew,
    setCurrentObjectId,
    setModel,
    setObjects
} from "../app/slices/tabDataSlice";
import {handleItemSwitch} from "./functions";
import {store} from "../app/store";
import { AllObjectsType } from "../types/redux";

export const changeTab = (tab: string) => {
    const isChanged = store.getState().tabData.isChanged;

    const method = () => {
        store.dispatch(setModel(tab));
        store.dispatch(setCurrentObjectId(null));
        store.dispatch(setCurrentObjectAsNew());
    };

    if (!isChanged) return method();
    handleItemSwitch(method);
};

export const goToObject = (objectId: string, model: string) => {
    const isChanged = store.getState().tabData.isChanged;

    const method = () => {
        store.dispatch(setCurrentObjectAsNew());
        store.dispatch(setModel(model));
        store.dispatch(setCurrentObjectId(objectId));
    }

    if (!isChanged) return method();
    handleItemSwitch(method);
};

export const addNewObject = (dataScheme: SchemeResponseType, dataAllObjects: AllObjectsType) => {
    const isChanged = store.getState().tabData.isChanged;
    const typesValues = {
        ObjectIdField: undefined,
        StringField: '',
        NumberField: 0,
        BooleanField: false,
        DistinctField: null,
        ReferenceField: null
    }
    const newObject: {[key:string]: any} = {};
    Object.keys(dataScheme).forEach((key) => {
        if (dataScheme[key].default) newObject[key] = dataScheme[key].default;
        else newObject[key] = typesValues[dataScheme[key].type as keyof typeof typesValues];
    });
    newObject.name = 'new item';

    const method = () => {
        store.dispatch(setObjects([...dataAllObjects, {id: newObject.id, name: newObject.name}]));
        store.dispatch(setCurrentObject(newObject));
        store.dispatch(setCurrentObjectId(newObject.id));
    };

    if (!isChanged) return method();
    handleItemSwitch(method);
}

export const showNotification = (text: string, variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    store.dispatch(setNotification({
        isOpen: true,
        text,
        variant
    }));
}