import React, {useEffect} from 'react';
import './App.css';
import Tabs from "./components/Tabs";
import {api} from "./app/api/api";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {initModels} from "./helpers/dispatchers";
import Dialog from "./components/Dialog";
import Notification from "./components/Notification";

function App() {
    const dispatch = useAppDispatch();
    const { data } = api.useGetModelsQuery();
    const currentModel = useAppSelector(state => state.app.currentModel);

    useEffect(() => {
        data && initModels(dispatch, data);
    }, [data, dispatch]);

    return (
        <div style={{height: '100vh', maxHeight: '100vh'}}>
            {currentModel && <Tabs/>}
            <Dialog/>
            <Notification/>
            {/*<Modal/>*/}
        </div>
    );
}

export default App;
