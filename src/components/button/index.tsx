import {FC} from 'react'
import './styles.css'

const Button: FC = () => (
    <div className="Button" onClick={() => console.log('oi')}>
        <span>Salvar</span>
    </div>
)

export default Button