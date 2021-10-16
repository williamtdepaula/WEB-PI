import { FC } from "react";
import './style.css'
import Select, { MultiValue } from "react-select";

interface OptionDropDownMulti {
    value: string;
    label: string;
}

interface DropdownMultiSelectProps {
    name: string;
    title: string;
    options: OptionDropDownMulti[];
    onSelectOptions: (values: string[]) => void;
}

const DropdownMultiSelect: FC<DropdownMultiSelectProps> = ({ name, title, options, onSelectOptions }) => {

    function onSelect(options: MultiValue<OptionDropDownMulti>) {
        onSelectOptions(options.map(item => item.value))
    }

    return (
        <div className='ContainerDropDownMulti'>
            {title}
            <Select
                isMulti
                name={name}
                options={options}
                onChange={onSelect}
                placeholder='Selecione'
            />
        </div>
    );
};

export default DropdownMultiSelect;