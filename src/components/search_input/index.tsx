import { FC, useState } from 'react'
import "./style.css"
import { MdSearch } from "react-icons/md";
import { stringHasOnlyNumbers } from '../../resources/validations';
import { maskCpf, maskRemoveAllSpecialCharacters } from '../../resources/masks';

interface SearchInputProps {
    onSearch: (search: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
    const [value, setValue] = useState<string>("");

    const _handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(value)
        }
    }

    return (
        <div className='ContainerInputSearch'>
            <input
                value={stringHasOnlyNumbers(maskRemoveAllSpecialCharacters(value)) ? maskCpf(value) : value}
                maxLength={200}
                onChange={({ target }) => setValue(target.value)}
                className={"InputSearch"}
                placeholder={'Digite um nome ou CPF'}
                onKeyDown={_handleKeyDown}
            />
            <MdSearch color='#969595' size={25} onClick={() => onSearch(value)} />
        </div>
    )
}

export default SearchInput