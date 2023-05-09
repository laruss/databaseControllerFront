import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {changeTab} from "../helpers/dispatchers";
import DataTab from "../pages/DataTab";

/*
  https://mui.com/material-ui/react-tabs/
 */

export default function Tabs() {
    const dispatch = useAppDispatch();
    const models = useAppSelector(state => state.app.models);
    const currentModel = useAppSelector(state => state.app.currentModel);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => changeTab(dispatch, newValue);

    return (
        <Box
            sx={{ width: '100%', typography: 'body1', height: '100%'}}
        >
            <TabContext value={currentModel as string}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        {
                            models && Object.keys(models).map((model, index) => {
                                return <Tab key={index} label={model} value={model}/>
                            })
                        }
                    </TabList>
                </Box>
                {
                    currentModel && <TabPanel value={currentModel as string}>
                        {currentModel && <DataTab/>}
                    </TabPanel>
                }
            </TabContext>
        </Box>
    );
}