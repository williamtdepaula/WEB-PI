import { FC, useState } from 'react'
import { useApplication } from '../../resources/contexts/ApplicationContext';
import RadioItem from './radio_item';
import './style_collection.css'

interface RadioCollectionProps {
    nameCollection: string;
    title: string;
    items: { title: string, value: string }[];
    onChangeOption: (value: string) => void;
}

const RadioCollection: FC<RadioCollectionProps> = ({ nameCollection, title, items, onChangeOption }) => {
    const {pixelsToAdd} = useApplication()

    const [optionSelected, setOptionSelected] = useState<string>(items[0].value)
    
    function onChangeRadio(value: string){
        setOptionSelected(value)
        onChangeOption(value)
    }

    return(
        <div className='ContainerRadioOptions'>
            <div className="TitleRadioCollection" style={{ fontSize: 16 + pixelsToAdd}}>{title}</div>
            <div className='ItemsRadio'>
                {items.map((radio, index) => <RadioItem key={index} name={nameCollection} title={radio.title} value={radio.value} isChecked={optionSelected === radio.value} onChange={onChangeRadio} />)}
            </div>
        </div>
    )
}

export default RadioCollection;