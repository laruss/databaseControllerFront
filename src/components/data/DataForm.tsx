import Box from "@mui/material/Box";
import {DataFormProps} from "../../types/components";
import DataField from "./DataField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import React, {useEffect, useState} from "react";
import {api} from "../../app/api/api";
import {dataIsChanged, getDataToCreate, getDataToUpdate} from "../../helpers/functions";
import {selectCurrentObject, selectIsChanged, setAsChanged} from "../../app/slices/tabDataSlice";
import {showNotification} from "../../helpers/dispatchers";
import useErrorHandler from "../../helpers/useErrorHandler";

const DataForm = (props: DataFormProps) => {
    const dispatch = useAppDispatch();

    const currentObject = useAppSelector(selectCurrentObject);
    const isChanged = useAppSelector(selectIsChanged);
    const [changedObject, setChangedObject] = useState(currentObject);

    const { error, refetch } = api.useGetOneObjectQuery(
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
        let data;
        if (changedObject.id) {
            data = getDataToUpdate(currentObject, changedObject);
            updateObject({ modelName: props.modelName, id: changedObject.id, data });
        } else {
            data = getDataToCreate(changedObject);
            createObject({modelName: props.modelName, data});
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

    useEffect(() => setChangedObject(currentObject), [currentObject]);

    useErrorHandler({ error, message: "Error while fetching data of current object" });

    useErrorHandler({ error: errorUpdateObject, message: "Error while updating object" });

    useErrorHandler({ error: errorCreateObject, message: "Error while creating object" });

    useEffect(() => {
        dataUpdateObject && showNotification('Object updated', 'success');
    }, [dataUpdateObject, props.modelName]);

    useEffect(() => {
        dataCreateObject && showNotification('Object created', 'success');
    }, [dataCreateObject, props.modelName]);

    useEffect(() => { currentObject.id && refetch() }, [currentObject.id, refetch]);

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