import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const InputGroup = ({ label, ...inputProps }) => (
    <div>
        <Label htmlFor={inputProps.id}>{label}</Label>
        <Input {...inputProps} />
    </div>
);

export default InputGroup;
