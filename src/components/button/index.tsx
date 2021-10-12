import { FC } from 'react';
import './styles.css';
import Loading from '../loading';

interface ButtonProps {
    onClick: () => void;
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, loading }) => (
    <div className="Button" onClick={!loading ? onClick : undefined} style={{ padding: loading ? 5 : 10 }}>
        {loading
            ?
            <Loading color='white'/>
            :
            <span>Salvar</span>
        }
    </div>
)

export default Button