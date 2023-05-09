import {DataFieldProps} from "../../types/components";
import {Switch, FormControl, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import DataDropdown from "./DataDropdown";
import React from "react";

const ObjectIdField = (props: DataFieldProps) => (
    <TextField
        label={props.name}
        disabled
        value={props.value}
    />
);

const BooleanField = (props: DataFieldProps) => (
    <FormControl>
        <FormControlLabel
            control={
                <Switch
                    checked={props.value as boolean}
                    onChange={(e) => props.onChange(props.name, e.target.value === 'on')}
                />
            }
            label={props.name}
            required={props.type.required}
            sx={{m: 2}}
        />
    </FormControl>
);

const NumberField = (props: DataFieldProps) => <TextField label={props.name} type="number" defaultValue={props.type.default} required={props.type.required}/>;

const StringField = (props: DataFieldProps) => (
    <TextField
        onChange={(e) => props.onChange(props.name, e.target.value)}
        label={props.name}
        required={props.type.required}
        value={props.value}
    />
);

const DictField = (props: DataFieldProps) => <Button variant="contained">{props.name}</Button>;

const fields = {
    ObjectIdField,
    BooleanField,
    NumberField,
    StringField,
    DictField,
    ReferenceField: DataDropdown
}


const DataField = (props: DataFieldProps) => {
    // useEffect(() => {
    //     props.name === 'is_current' && console.log(props);
    // }, [props]);

    return (
        fields[props.type.type](props)
    )
};

export default DataField;