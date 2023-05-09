import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {DataFieldProps} from "../../types/components";
import {useAppSelector} from "../../app/hooks";
import {api} from "../../app/api/api";
import Button from "@mui/material/Button";
import {goToObject} from "../../helpers/dispatchers";

const DataDropdown = (props: DataFieldProps) => {
    const models: {[key: string]: string} = useAppSelector(state => state.app.models);
    const objectRef = props.type.references;
    const modelName = Object.keys(models).find(key => models[key] === objectRef);

    const { data: dataAllObjects } = api.useGetAllObjectsQuery({modelName: modelName as string}, {skip: !modelName});

    let currentName = '';

    if (!dataAllObjects) return <>Loading...</>;

    currentName = dataAllObjects.find((object) => object.id === props.value)?.name || '';

    const handleClick = () => {
        if (!props.value) return;
        const model = Object.keys(models).find(key => models[key] === objectRef);
        const objectId = props.value;

        goToObject(objectId as string, model as string);
    };

    return (
        <Autocomplete
            disablePortal
            options={dataAllObjects as {id: string, name: string}[]}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={props.value ? { id: props.value, name: currentName } : null}
            onChange={(event, newValue) => {
                props.onChange(props.name, newValue?.id as string || '');
            }}
            sx={{ width: 300 }}
            renderInput={
                (params) => {
                    return (
                        <div style={{display: 'inline-flex', flexWrap: 'nowrap'}}>
                            <TextField {...params} label={props.name} required={props.type.required}/>
                            {
                                props.value &&
                            <Button variant={'outlined'} onClick={handleClick}>👀</Button>
                            }
                        </div>
                    )
                }
            }
        />
    );
};

export default DataDropdown;