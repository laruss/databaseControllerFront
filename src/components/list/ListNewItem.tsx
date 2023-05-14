import ListItemMUI from "@mui/material/ListItem";
import {ListItemButton, SxProps} from "@mui/material";
import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";
import {addNewObject} from "../../helpers/dispatchers";
import {useAppSelector} from "../../app/hooks";
import {selectFields, selectObjects} from "../../app/slices/tabDataSlice";

const itemCSS = css`
  &.Mui-selected {
    background-color: #88b8c4;
  }

  &.MuiListItemButton-root {
    background-color: #dfe9eb;
    justify-content: center;
  }

  &.Mui-focusVisible {
    background-color: #b1d9e3;
  }

  :hover {
    background-color: #b1d9e3;
  }
`

const ListNewItem = () => {
    const dataScheme = useAppSelector(selectFields);
    const objects = useAppSelector(selectObjects);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const handleClick = () => {
        addNewObject(dataScheme, objects.all);
    };

    useEffect(() => {
        if (objects.all) {
            // check that all objects don't have id === undefined
            const allObjectsHaveId = objects.all.every((object) => object.id !== undefined);
            setButtonDisabled(!allObjectsHaveId);
        }
    }, [objects.all]);

    return (
        <ListItemMUI>
            <ListItemButton
                sx={itemCSS as SxProps}
                onClick={handleClick}
                disabled={buttonDisabled}
            >
                add new
            </ListItemButton>
        </ListItemMUI>
    )
};

export default ListNewItem;