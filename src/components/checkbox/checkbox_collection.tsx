import { FC, useEffect, useState } from "react"
import CheckboxItem from "./checkbox_item"
import './checkbox_collection_style.css'
import { useApplication } from "../../resources/contexts/ApplicationContext";

export interface OptionCheckbox {
    value: string,
    label: string,
}

interface CheckboxCollectionProps {
    title: string;
    items: OptionCheckbox[];
    onChange: (valuesSelected: string[]) => void;
}

const CheckboxCollection: FC<CheckboxCollectionProps> = ({ title, items, onChange }) => {

    const {pixelsToAdd} = useApplication()

    const [optionsSelected, setOptionsSeletected] = useState<string[]>([]);

    useEffect(() => {
        onChange(optionsSelected)
    }, [optionsSelected])

    function onPressReason(reason: string) {
        if (!optionsSelected.includes(reason)) {
            setOptionsSeletected((old) => old.concat(reason));
        } else {
            //Se não criarmos uma cópia, quando formos setar o novo valor no estado, o valor original não será alterado
            const copyOfReasons = [...optionsSelected];

            const indexOfReason = copyOfReasons.indexOf(reason);

            if (indexOfReason !== -1) {
                copyOfReasons.splice(indexOfReason, 1);
            }

            setOptionsSeletected(copyOfReasons);
        }
    }

    return (
        <div className='CollectionCheckboxContainer'>
            
            <div className="TitleDatePicker" style={{ fontSize: 16 + pixelsToAdd}}>{title}</div>
            {
                items.map((item, index) => <CheckboxItem key={index} label={item.label} onChange={() => onPressReason(item.value)} />)
            }
        </div>
    )
}

export default CheckboxCollection