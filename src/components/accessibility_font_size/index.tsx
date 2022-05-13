import './style.css'

import {FaSearchPlus, FaSearchMinus} from 'react-icons/fa'
import { useApplication } from '../../resources/contexts/ApplicationContext';

const AccessibilityFontSize = () => {
    const {addFontSize, minusFontSize} = useApplication()

    return (
        <div className='ContainerButtonsAccessibility'>
            <div className='ButtonPlusOrMinusFontSize' onClick={addFontSize}>
                <FaSearchPlus color='#4f4f4f' size={20}/>
            </div>
            <div className='ButtonPlusOrMinusFontSize' onClick={minusFontSize}>
                <FaSearchMinus color='#4f4f4f' size={20}/>
            </div>
        </div>
    );
}

export default AccessibilityFontSize;