import {IconButton, ListItemSecondaryAction} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {ListItemDeleteInterface} from "../../types/components";
import {api} from "../../app/api/api";
import {showNotification} from "../../helpers/dispatchers";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setCurrentObjectId} from "../../app/slices/tabDataSlice";

const ListItemDelete = (props: ListItemDeleteInterface) => {
    const dispatch = useAppDispatch();
    const { itemId, modelName } = props;
    const currentObject = useAppSelector(state => state.tabData.objects.current);

    const [deleteItem] = api.useDeleteObjectMutation();

    const handleDeleteItem = () => {
        deleteItem({modelName, id: itemId})
            .unwrap()
            .then(() => {
                currentObject.id === itemId && dispatch(setCurrentObjectId(null));
                showNotification('Object was deleted successfully', 'success');
            })
            .catch((error) => {
                console.log(error);
                showNotification(error.data.error || error.data, 'error');
            });
    }

    return (
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={handleDeleteItem}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    )
};

export default ListItemDelete;