import Box from "@mui/material/Box";
import {DataFormProps} from "../../types/components";
import DataField from "./DataField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import React, {useEffect, useState} from "react";
import {api} from "../../app/api/api";
import {dataIsChanged} from "../../helpers/functions";
import {setAsChanged} from "../../app/slices/tabDataSlice";
import {goToObject, showNotification} from "../../helpers/dispatchers";

const DataForm = (props: DataFormProps) => {
    const dispatch = useAppDispatch();

    const currentObject = useAppSelector(state => state.tabData.objects.current);
    const isChanged = useAppSelector(state => state.tabData.isChanged);
    const [changedObject, setChangedObject] = useState(currentObject);

    const { data } = api.useGetOneObjectQuery(
        {modelName: props.modelName, id: props.selectedItemId as string},
        {skip: props.selectedItemId === null || props.selectedItemId === 'will be generated'}
    );

    const [updateObject] = api.useUpdateObjectMutation();
    const [createObject] = api.useCreateObjectMutation();

    const saveHandler = () => {
        if (!changedObject.id) return;
        if (changedObject.id !== 'will be generated') {
            const dataToUpdate = Object.keys(changedObject).reduce((acc, key) => {
                if (changedObject[key] !== currentObject[key]) {
                    acc[key] = changedObject[key];
                }
                return acc;
            }, {} as {[key:string]: any});
            updateObject({modelName: props.modelName, id: changedObject.id, data: dataToUpdate})
                .unwrap()
                .then(() => {
                    showNotification(dispatch, 'Object was updated successfully', 'success');
                })
                .catch((error) => {
                    console.log(error);
                    showNotification(dispatch, error.data.error || error.data, 'error');
                });
        } else {
            const dataToCreate = Object.keys(changedObject).reduce((acc, key) => {
                key !== 'id' && (acc[key] = changedObject[key]);
                return acc;
            }, {} as {[key:string]: any});
            createObject({modelName: props.modelName, data: dataToCreate})
                .unwrap()
                .then((newData) => {
                    dispatch(setAsChanged(false));
                    showNotification(dispatch, 'Object was created successfully', 'success');
                    newData.id && goToObject(newData.id as string, props.modelName);
                })
                .catch((error) => {
                    console.log(error);
                    showNotification(dispatch, error.data.errors || error.data, 'error');
                });
        }
    };

    const changeFieldHandler = (name: string, value: string | boolean) => {
        setChangedObject({...changedObject, [name]: value});
    };

    useEffect(() => {
        data && props.setCurrentObject(data);
    }, [data]);

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