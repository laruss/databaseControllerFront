import {IconButton, ListItemSecondaryAction} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useEffect} from "react";
import {ListItemDeleteInterface} from "../../types/components";
import {api} from "../../app/api/api";
import {showNotification} from "../../helpers/dispatchers";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setCurrentObjectId} from "../../app/slices/tabDataSlice";
import useErrorHandler from "../../helpers/useErrorHandler";

const ListItemDelete = (props: ListItemDeleteInterface) => {
    const dispatch = useAppDispatch();
    const { itemId, modelName } = props;
    const currentObject = useAppSelector(state => state.tabData.objects.current);

    const [deleteItem, {error, data}] = api.useDeleteObjectMutation();

    const handleDeleteItem = () => deleteItem({modelName, id: itemId});

    useErrorHandler({
        error,
        message: "Error while deleting object"
    });

    useEffect(() => {
        if (data !== undefined) {
            currentObject.id === itemId && dispatch(setCurrentObjectId(null));
            showNotification('Object was deleted successfully', 'success');
        }
    }, [data, currentObject.id, itemId, dispatch]);

    return (
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={handleDeleteItem}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    )
};

export default ListItemDelete;