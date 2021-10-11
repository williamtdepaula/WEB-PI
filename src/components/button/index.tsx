import { FC } from 'react'
import './styles.css'

interface ButtonProps {
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => (
    <div className="Button" onClick={onClick}>
        <span>Salvar</span>
    </div>
)

export default Button