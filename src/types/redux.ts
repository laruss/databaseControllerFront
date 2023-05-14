import {
    ModelsResponseType,
    OneObjectResponseType,
    SchemeResponseType
} from "./api";
import {CurrentModelType, ObjectIdType} from "./common";

export interface AppState {
    isLoaded: boolean;
    models: ModelsResponseType;
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
export interface CurrentObjectInterface extends OneObjectResponseType {id: ObjectIdType}

export type AllObjectsType = {
    id: ObjectIdType;
    name: string;
}[];

export interface TabDataStateInterface {
    model: CurrentModelType;
    fields: SchemeResponseType;
    objects: {
        all: AllObjectsType;
        current: CurrentObjectInterface;
    };
    isChanged: boolean;
}

export interface CurrentObjectInterface {
    [key: string]: any;
}