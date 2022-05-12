import React, { CSSProperties, forwardRef, HTMLInputTypeAttribute, RefObject, useImperativeHandle, useState } from 'react'
import "./style.css"

export interface ItemFormRef {
    validate(): boolean;
}

export function validateAll(itemsToValidate: RefObject<ItemFormRef>[]){
    const responses = itemsToValidate?.map((ref) => ref.current?.validate());

    const errors = responses?.filter((res) => !res);

    return errors ? errors.length === 0 : false;
}

interface TextInputProps {
    title: string;
    titleStyle?: CSSProperties;
    type?: HTMLInputTypeAttribute;
    value: string;
    isValid: boolean;
    maxLength?: number;
    style?: CSSProperties;
    placeholder?: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = forwardRef<ItemFormRef, TextInputProps>(({ title, type, titleStyle, value, placeholder, isValid, maxLength = 500, errorMessage, style, onChange }, ref) => {

    const [showError, setShowError] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
        return {
            validate: () => {
                setShowError(!isValid)
                return isValid;
            },
        };
    });

    function onChangeValue(value: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) onChange(value)
        setShowError(false)
    }

    return (
        <div className='containerInput' style={style}>
            <div className="Title" style={titleStyle}>{title}</div>
            <input
                type={type}
                value={value}
                maxLength={maxLength}
                onChange={onChangeValue}
                className={showError ? "InputError" : "Input"}
                placeholder={placeholder}
            />
            {showError &&
                <div className='MessageError'>{errorMessage}</div>
            }
        </div>
    )
})

export default TextInput