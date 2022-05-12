import { CSSProperties, FC } from 'react';
import './styles.css';
import Loading from '../animations/loading';

interface ButtonProps {
    onClick: () => void;
    title: string;
    loading?: boolean;
    styles?: CSSProperties
}

const Button: FC<ButtonProps> = ({ onClick, loading, title, styles }) => (
    <div className="Button" onClick={!loading ? onClick : undefined} style={{ padding: loading ? 5 : 10, ...styles }}>
        {loading
            ?
            <Loading color='white'/>
            :
            <span>{title}</span>
        }
    </div>
)

export default Button