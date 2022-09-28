import React, {ChangeEventHandler, FC} from 'react';
import s from './CustomInput.module.scss'

interface CustomInputProps {
    value?: string,
    placeholder?: string,
    changeHandler?: ChangeEventHandler<HTMLInputElement>
    type: string
}

const CustomInput:FC<CustomInputProps> = ({value, type, changeHandler, placeholder}) => {
    return (
        <input className={s.input} type={type} value={value} placeholder={placeholder} onChange={changeHandler}/>
    );
};

export default CustomInput;