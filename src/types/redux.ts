import {AllObjectsResponseType, ModelsResponseType, OneObjectResponseType, SchemeResponseType} from "./api";
import {CurrentModelType} from "./common";

export interface AppState {
    isLoaded: boolean;
    models: ModelsResponseType;
    currentModel: CurrentModelType;
    dialog: {
        isOpen: boolean;
        title: string;
        text: string;
        onConfirm: () => void;
        onCancel: () => void;
    },
    notification: {
        isOpen: boolean;
        text: string;
        variant: 'success' | 'error' | 'warning' | 'info';
    }
}

export type ObjectIdType = string | null;
export interface CurrentObjectInterface extends OneObjectResponseType {id: ObjectIdType}

export interface TabDataState {
    fields: SchemeResponseType;
    objects: {
        all: AllObjectsResponseType;
        current: CurrentObjectInterface;
    };
    isChanged: boolean;
}

export interface CurrentObjectInterface {
    [key: string]: any;
}