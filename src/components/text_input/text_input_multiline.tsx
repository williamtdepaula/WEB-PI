import React, { forwardRef, Fragment, RefObject, useImperativeHandle, useState } from 'react'
import "./style.css"

export interface ItemFormRef {
    validate(): boolean;
}

export function validateAll(itemsToValidate: RefObject<ItemFormRef>[]) {
    const responses = itemsToValidate?.map((ref) => ref.current?.validate());

    const errors = responses?.filter((res) => !res);

    return errors ? errors.length === 0 : false;
}

interface TextInputProps {
    title: string;
    value: string;
    isValid?: boolean;
    maxLength?: number;
    style?: React.CSSProperties;
    placeholder?: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInputMultiline = forwardRef<ItemFormRef, TextInputProps>(({ title, value, placeholder, isValid, maxLength = 500, errorMessage, style, onChange }, ref) => {

    const [showError, setShowError] = useState<boolean>(false)

    useImperativeHandle(ref, () => {
        return {
            validate: () => {
                if (isValid) {
                    setShowError(!isValid)
                    return isValid;
                } 
                return true
            },
        };
    });

    function onChangeValue(value: React.ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) onChange(value)
        setShowError(false)
    }

    return (
        <Fragment>
            <div className="Title">{title}</div>
            <textarea
                value={value}
                maxLength={maxLength}
                onChange={onChangeValue}
                className={showError ? "InputError" : "Input"}
                style={style}
                placeholder={placeholder}

            />
            {showError &&
                <div className='MessageError'>{errorMessage}</div>
            }
        </Fragment>
    )
})

export default TextInputMultiline