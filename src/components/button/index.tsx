import { FC } from 'react';
import './styles.css';
import Loading from '../loading';

interface ButtonProps {
    onClick: () => void;
    title: string;
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, loading, title }) => (
    <div className="Button" onClick={!loading ? onClick : undefined} style={{ padding: loading ? 5 : 10 }}>
        {loading
            ?
            <Loading color='white'/>
            :
            <span>{title}</span>
        }
    </div>
)

export default Button