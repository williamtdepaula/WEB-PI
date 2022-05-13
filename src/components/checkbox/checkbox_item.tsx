import { FC } from 'react'
import { useApplication } from '../../resources/contexts/ApplicationContext';
import './checkbox_item_style.css'

interface CheckboxItemProps{
    label: string;
    onChange: () => void;
}

const CheckboxItem: FC<CheckboxItemProps> = ({label, onChange}) => {

    const {pixelsToAdd} = useApplication()

    return (
        <div className='ItemCheckbox' style={{fontSize: 14 + pixelsToAdd}}>
            <input 
                type='checkbox' 
                onChange={onChange}
                style={{width: 12 + pixelsToAdd, height: 12 + pixelsToAdd}} 
            />
            {label}
        </div>
    )
}

export default CheckboxItem