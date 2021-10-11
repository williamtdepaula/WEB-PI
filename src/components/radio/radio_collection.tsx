import { FC, useState } from 'react'
import RadioItem from './radio_item';
import './style_collection.css'

interface RadioCollectionProps {
    nameCollection: string;
    title: string;
    items: { title: string, value: string }[];
    onChangeOption: (value: string) => void;
}

const RadioCollection: FC<RadioCollectionProps> = ({ nameCollection, title, items, onChangeOption }) => {
    const [optionSelected, setOptionSelected] = useState<string>(items[0].value)
    
    function onChangeRadio(value: string){
        setOptionSelected(value)
        onChangeOption(value)
    }

    return(
        <div className='ContainerRadioOptions'>
            {title}
            <div className='ItemsRadio'>
                {items.map((radio, index) => <RadioItem key={index} name={nameCollection} title={radio.title} value={radio.value} isChecked={optionSelected === radio.value} onChange={onChangeRadio} />)}
            </div>
        </div>
    )
}

export default RadioCollection;