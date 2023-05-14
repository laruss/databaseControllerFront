import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useAppSelector} from "../app/hooks";
import {changeTab} from "../helpers/dispatchers";
import DataTab from "../pages/DataTab";
import {selectModels} from "../app/slices/appSlice";
import { CurrentModelType } from '../types/common';

interface TabsProps {
    currentModel: CurrentModelType;
}

export default function Tabs({ currentModel }: TabsProps) {
    const models = useAppSelector(selectModels);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => changeTab(newValue);

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
                    currentModel && <TabPanel value={currentModel}>
                        { currentModel && <DataTab currentModel={currentModel}/> }
                    </TabPanel>
                }
            </TabContext>
        </Box>
    );
}