import { FC } from 'react'
import './checkbox_item_style.css'

interface CheckboxItemProps{
    label: string;
    onChange: () => void;
}

const CheckboxItem: FC<CheckboxItemProps> = ({label, onChange}) => (
    <div className='ItemCheckbox'>
        <input type='checkbox' onChange={onChange} />
        {label}
    </div>
)

export default CheckboxItem