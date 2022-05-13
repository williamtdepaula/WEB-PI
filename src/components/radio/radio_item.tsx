import { FC } from 'react';
import { useApplication } from '../../resources/contexts/ApplicationContext';
import './style_radio_item.css'

interface RadioItemProps {
    name: string;
    title: string;
    value: string;
    onChange: (value: string) => void;
    isChecked: boolean;
}

const RadioItem: FC<RadioItemProps> = ({name, title, value, isChecked, onChange}) => {
    
    const {pixelsToAdd} = useApplication()
    
    return (
        <div className="ContainerItemRadio" style={{fontSize: 14 + pixelsToAdd}}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={isChecked}
                onChange={() => onChange(value)}
                style={{width: 12 + pixelsToAdd, height: 12 + pixelsToAdd}}
            />
            {title}
        </div>
    );
}
export default RadioItem;