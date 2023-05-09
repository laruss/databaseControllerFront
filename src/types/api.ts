export interface ModelsResponseType {
    [key: string]: string;
}

export type CommonFieldType = 'ObjectIdField' | 'StringField' | 'NumberField' | 'BooleanField' | 'DictField' | 'ReferenceField';

export interface SchemeFieldsType {
    type: CommonFieldType;
    required: boolean;
    default: string | number | boolean | string[] | number[] | boolean[] | null;
    references: string | null;
}

export type SchemeResponseType = {
    [key: string]: SchemeFieldsType;
}

export type AllObjectsResponseType = {
    'id': string;
    'name': string;
}[];

export type OneObjectResponseType = {
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | null;
}