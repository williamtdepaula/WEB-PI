import React, { FC, Fragment } from 'react'
import "./style.css"

interface TextInputProps {
    title: string;
    value: string;
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({title, value, maxLength = 500, onChange }) => (
    <Fragment>
        <div className="Title">{title}</div>
        <input
            value={value}
            maxLength={maxLength}
            onChange={onChange}
            className={"Input"}
        />
    </Fragment>
)

export default TextInput