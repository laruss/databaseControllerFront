import {
    AllObjectsResponseType,
    SchemeResponseType,
    SchemeFieldsType, OneObjectResponseType
} from "./api";

export interface ListProps {
    items: AllObjectsResponseType;
    selectedItemId: string | null;
    modelName: string;
}

export interface DataFormProps {
    fields: SchemeResponseType;
    selectedItemId: string;
    modelName: string;
    setCurrentObject: (data: OneObjectResponseType) => void;
}

export interface DataFieldProps {
    name: string;
    type: SchemeFieldsType;
    value?: string | number | boolean | string[] | number[] | boolean[] | null;
    onChange: (name: string, value: string | boolean) => void;
}

export interface ListItemDeleteInterface {
    itemId: string;
    modelName: string;
}

export interface ListItemInterface {
    itemId: string;
    itemName: string;
    modelName: string;
    selectedItemId: string | null;
}