import { CSSProperties, FC } from 'react'
import "./style.css"
import Select from 'react-select';
import { useApplication } from '../../resources/contexts/ApplicationContext';

export interface Option {
    value: string, 
    label: string,
}

interface DropDownPickerProps {
    title: string;
    options: Option[];
    onSelect: (value: string) => void;
    style?: CSSProperties
}

const DropDownPicker: FC<DropDownPickerProps> = ({ title, options, onSelect, style }) =>{ 

    const {pixelsToAdd} = useApplication()

    return (
        <div className='ContainerDropDown' style={{...style, fontSize: 16 + pixelsToAdd}}>
            {title}
            <Select
                className='InputDropDown'
                options={options}
                defaultValue={options[0]}
                onChange={(v) => v ? onSelect(v.value) : null}
            />
        </div>
    )
}

export default DropDownPicker