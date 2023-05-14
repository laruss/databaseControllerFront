import {useAppSelector} from "../app/hooks";
import {api} from "../app/api/api";
import React, {useEffect} from "react";
import {selectFields, selectObjects} from "../app/slices/tabDataSlice";
import List from "../components/list/List";
import DataForm from "../components/data/DataForm";
import Box from "@mui/material/Box";
import {CurrentModelType} from "../types/common";
import useErrorHandler from "../helpers/useErrorHandler";

interface DataTabProps {
    currentModel: CurrentModelType;
}

const DataTab = ({ currentModel }: DataTabProps) => {
    const fields = useAppSelector(selectFields);

    const objects = useAppSelector(selectObjects);

    const [getSchemes, { error: errorScheme }] = api.useLazyGetSchemesQuery();

    const [getAllObjects, { error: errorAllObjects }] = api.useLazyGetAllObjectsQuery();

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
                objects.current.id !== null && fields && (
                    <DataForm
                        fields={fields}
                        modelName={currentModel as string}
                    />
                )
            }
        </Box>
    )
};

export default DataTab;