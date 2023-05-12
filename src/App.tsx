import React from 'react';
import './App.css';
import Tabs from "./components/Tabs";
import {api} from "./app/api/api";
import {useAppSelector} from "./app/hooks";
import Dialog from "./components/Dialog";
import Notification from "./components/Notification";
import useErrorHandler from "./helpers/useErrorHandler";
import {selectCurrentModel} from "./app/slices/appSlice";

function App() {
    const { error } = api.useGetModelsQuery();
    const currentModel = useAppSelector(selectCurrentModel);

    useErrorHandler({
        error,
        message: 'Error while fetching models',
    });

    return (
        <div style={{height: '100vh', maxHeight: '100vh'}}>
            {currentModel && <Tabs currentModel={currentModel}/>}
            <Dialog/>
            <Notification/>
            {/*<Modal/>*/}
        </div>
    );
}

export default App;
