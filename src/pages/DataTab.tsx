import {useAppDispatch, useAppSelector} from "../app/hooks";
import {api} from "../app/api/api";
import React, {useEffect} from "react";
import { selectFields, setCurrentObject } from "../app/slices/tabDataSlice";
import List from "../components/list/List";
import DataForm from "../components/data/DataForm";
import Box from "@mui/material/Box";
import {OneObjectResponseType} from "../types/api";
import {CurrentModelType} from "../types/common";
import useErrorHandler from "../helpers/useErrorHandler";

interface DataTabProps {
    currentModel: CurrentModelType;
}

const DataTab = ({ currentModel }: DataTabProps) => {
    const fields = useAppSelector(selectFields);
    const dispatch = useAppDispatch();

    const objects = useAppSelector(state => state.tabData.objects);

    const [getSchemes, { error: errorScheme }] = api.useLazyGetSchemesQuery();

    const [getAllObjects, { error: errorAllObjects }] = api.useLazyGetAllObjectsQuery();

    const handleFetchCurrentObject = (object: OneObjectResponseType) => {
        dispatch(setCurrentObject(object));
    };

    useErrorHandler({
        error: errorScheme,
        message: 'Error while fetching data scheme'
    });

    useErrorHandler({
        error: errorAllObjects,
        message: 'Error while fetching data objects'
    });

    useEffect(() => {
        if (currentModel) {
            const modelName = currentModel as string;
            getSchemes({ modelName });
            getAllObjects({ modelName });
        }
    }, [currentModel, getSchemes, getAllObjects]);

    return (
        <Box
            display={'flex'}
            sx={{overflow: 'hidden'}}
        >
            <List
                selectedItemId={objects.current.id}
                items={objects.all}
                modelName={currentModel as string}
            />
            {
                objects.current.id && fields && (
                    <DataForm
                        fields={fields}
                        selectedItemId={objects.current.id}
                        modelName={currentModel as string}
                        setCurrentObject={handleFetchCurrentObject}
                    />
                )
            }
        </Box>
    )
};

export default DataTab;