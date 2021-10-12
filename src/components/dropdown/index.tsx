import { FC } from 'react'
import "./style.css"
import Select from 'react-select';

export interface Option {
    value: string, 
    label: string,
}

interface DropDownPickerProps {
    title: string;
    options: Option[];
    onSelect: (value: string) => void;
}

const DropDownPicker: FC<DropDownPickerProps> = ({ title, options, onSelect }) => (
    <div className='ContainerDropDown'>
        {title}
        <Select
            className='InputDropDown'
            options={options}
            defaultValue={options[0]}
            onChange={(v) => v ? onSelect(v.value) : null}
        />
    </div>
)

export default DropDownPicker