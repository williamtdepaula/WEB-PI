import { FC } from 'react';
import './style.css';

const BasePage: FC = ({children}) => (
    <div className="Background">
        <header>
            <div className="Header">

            </div>
        </header>
        <body>
            <div className="Body">
                {children}
            </div>
        </body>
    </div>
)

export default BasePage