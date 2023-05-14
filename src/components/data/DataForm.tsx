import Box from "@mui/material/Box";
import {DataFormProps} from "../../types/components";
import DataField from "./DataField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import React, {useEffect, useState} from "react";
import {api} from "../../app/api/api";
import {dataIsChanged} from "../../helpers/functions";
import {selectCurrentObject, selectIsChanged, setAsChanged} from "../../app/slices/tabDataSlice";
import {goToObject, showNotification} from "../../helpers/dispatchers";
import useErrorHandler from "../../helpers/useErrorHandler";

const DataForm = (props: DataFormProps) => {
    const dispatch = useAppDispatch();

    const currentObject = useAppSelector(selectCurrentObject);
    const isChanged = useAppSelector(selectIsChanged);
    const [changedObject, setChangedObject] = useState(currentObject);

    const { error } = api.useGetOneObjectQuery(
        { modelName: props.modelName, id: currentObject.id as string },
        { skip: !currentObject.id }
    );

    const [
        updateObject,
        {
            error: errorUpdateObject,
            data: dataUpdateObject
        }] = api.useUpdateObjectMutation();

    const [
        createObject,
        {
            error: errorCreateObject,
            data: dataCreateObject
        }] = api.useCreateObjectMutation();

    const saveHandler = () => {
        if (changedObject.id === null) return;
        if (changedObject.id) {
            const dataToUpdate = Object.keys(changedObject).reduce((acc, key) => {
                if (changedObject[key] !== currentObject[key]) {
                    acc[key] = changedObject[key];
                }
                return acc;
            }, {} as {[key:string]: any});
            updateObject({modelName: props.modelName, id: changedObject.id, data: dataToUpdate});
        } else {
            const dataToCreate = Object.keys(changedObject).reduce((acc, key) => {
                key !== 'id' && (acc[key] = changedObject[key]);
                return acc;
            }, {} as {[key:string]: any});
            createObject({modelName: props.modelName, data: dataToCreate});
        }
    };

    const changeFieldHandler = (name: string, value: string | boolean) => {
        setChangedObject({...changedObject, [name]: value});
    };

    useEffect(() => {
        if (dataIsChanged(currentObject, changedObject)) {
            dispatch(setAsChanged(true));
        } else {
            dispatch(setAsChanged(false));
        }
    }, [changedObject, currentObject, dispatch]);

    useEffect(() => {
        setChangedObject(currentObject);
    }, [currentObject]);

    useErrorHandler({
        error,
        message: "Error while fetching data of current object"
    });

    useErrorHandler({
        error: errorUpdateObject,
        message: "Error while updating object"
    });

    useErrorHandler({
        error: errorCreateObject,
        message: "Error while creating object"
    });

    useEffect(() => {
        if (dataUpdateObject) {
            showNotification('Object updated', 'success');
            goToObject(dataUpdateObject.id as string, props.modelName);
        }
    }, [dataUpdateObject, props.modelName]);

    useEffect(() => {
        if (dataCreateObject) {
            showNotification('Object created', 'success');
            goToObject(dataCreateObject.id as string, props.modelName);
        }
    }, [dataCreateObject, props.modelName]);

    if (Object.keys(changedObject).length === 1) return null;

    return (
        <Box
            flexGrow={'2'}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {
                Object.keys(props.fields).map((key, index) => {
                    return (
                        <DataField
                            name={key}
                            type={props.fields[key]} key={index}
                            value={(changedObject)[key]}
                            onChange={changeFieldHandler}
                        />
                    )
                })
            }
            <Button
                variant="contained"
                disabled={!isChanged}
                onClick={saveHandler}
                style={{'width': '100px', margin: '1%'}}
            >
                Save
            </Button>
        </Box>
    )
};

export default DataForm;