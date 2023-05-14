import React from 'react';
import './App.css';
import Tabs from "./components/Tabs";
import {api} from "./app/api/api";
import {useAppSelector} from "./app/hooks";
import Dialog from "./components/Dialog";
import Notification from "./components/Notification";
import {selectModel} from "./app/slices/tabDataSlice";
import useErrorHandler from "./helpers/useErrorHandler";

function App() {
    const { error } = api.useGetModelsQuery();
    const currentModel = useAppSelector(selectModel);

    useErrorHandler({
        error,
        message: 'Error while fetching models',
    });

    return (
        <div style={{height: '100vh', maxHeight: '100vh'}}>
            {<Tabs currentModel={currentModel}/>}
            <Dialog/>
            <Notification/>
            {/*<Modal/>*/}
        </div>
    );
}

export default App;
