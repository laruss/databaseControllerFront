import {store} from "../app/store";
import {setDialog} from "../app/slices/appSlice";
import {CurrentObjectInterface} from "../types/redux";

export const dataIsChanged = (originalObject: CurrentObjectInterface, changedObject: CurrentObjectInterface) => {
    let result = false;
    Object.keys(changedObject).forEach((key) => {
        if (changedObject[key] !== originalObject[key]) {
            result = true;
        }
    });

    return result;
};

export const handleItemSwitch = (anyFunction: () => void) => {
    store.dispatch(setDialog({
        isOpen: true,
        title: 'You have unsaved changes',
        text: 'You have unsaved changes. Are you sure you want to switch?',
        onConfirm: () => {
            anyFunction();
        },
        onCancel: () => {}
    }));
};

export const getDataToUpdate = (currentObject: CurrentObjectInterface, changedObject: CurrentObjectInterface) => (
    Object.keys(changedObject).reduce((acc, key) => {
        if (changedObject[key] !== currentObject[key]) {
            acc[key] = changedObject[key];
        }
        return acc;
    }, {} as {[key:string]: any})
);

export const getDataToCreate = (changedObject: CurrentObjectInterface) => (
    Object.keys(changedObject).reduce((acc, key) => {
        key !== 'id' && (acc[key] = changedObject[key]);
        return acc;
    }, {} as {[key:string]: any})
);