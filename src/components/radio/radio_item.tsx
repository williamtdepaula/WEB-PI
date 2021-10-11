import { FC } from 'react';
import './style_radio_item.css'

interface RadioItemProps {
    name: string;
    title: string;
    value: string;
    onChange: (value: string) => void;
    isChecked: boolean;
}

const RadioItem: FC<RadioItemProps> = ({name, title, value, isChecked, onChange}) => (
    <div className="ContainerItemRadio">
        <input
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            onChange={() => onChange(value)}
        />
        {title}
    </div>
);

export default RadioItem;