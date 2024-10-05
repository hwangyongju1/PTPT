import React from 'react';

const Input = ({ type, id, name, placeholder, value, onChange, autoComplete, required }) => (
    <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
    />
);

export default Input;