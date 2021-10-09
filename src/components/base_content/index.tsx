import { FC } from 'react';
import './style.css';

const BaseContent: FC = ({ children }) => (
    <div className="Container">
        <div className="ContentContainer">
            {children}
        </div>
    </div>
)

export default BaseContent