import { FC } from 'react';
import './style.css';
import Loading from '../../loading';

interface LinkButtonProps {
    onClick: () => void;
    title: string;
    loading?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({ onClick, loading, title }) => (
    <div className="LinkButton" onClick={!loading ? onClick : undefined}>
        {loading
            ?
            <Loading color='blue' style={{ height: 50 }} />
            :
            <span>{title}</span>
        }
    </div>
)

export default LinkButton