import ListMUI from '@mui/material/List';
import ListItem from "./ListItem";
import {ListProps} from "../../types/components";
import Box from "@mui/material/Box";
import React from "react";
import ListNewItem from "./ListNewItem";

const List = (props: ListProps) => {
    return (
        <Box
            display={'flex'}
            flexGrow={'1'}
            alignItems={'stretch'}
            sx={{height: '85vh', overflow: 'auto'}}
        >
            <ListMUI
                style={{width: '100%', backgroundColor: '#ebebeb'}}
            >
                <ListNewItem/>
                {
                    props.items.map((item, index) => (
                        <ListItem
                            key={index}
                            itemId={item.id}
                            itemName={item.name}
                            modelName={props.modelName}
                            selectedItemId={props.selectedItemId}
                        />
                    ))
                }
            </ListMUI>
        </Box>
    )
};

export default List;