import {
    SchemeResponseType,
    SchemeFieldsType
} from "./api";
import {AllObjectsType} from "./redux";
import {ObjectIdType} from "./common";

export interface ListProps {
    items: AllObjectsType;
    selectedItemId: ObjectIdType;
    modelName: string;
}

export interface DataFormProps {
    fields: SchemeResponseType;
    modelName: string;
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
    itemId: ObjectIdType;
    itemName: string;
    modelName: string;
    selectedItemId: ObjectIdType;
}