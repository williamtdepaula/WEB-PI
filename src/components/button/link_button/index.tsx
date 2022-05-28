import { FC } from 'react';
import './style.css';
import Loading from '../../animations/loading';

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
            <p>{title}</p>
        }
    </div>
)

export default LinkButton