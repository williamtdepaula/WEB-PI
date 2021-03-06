import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSmallScreen } from '../../resources/hooks';
import UserAccessButton from '../button/user_access_button';
import './style.css';

const BasePage: FC = ({children}) => {
    const isMobile = useSmallScreen()

    const history = useHistory()

    function onPressHome() {
        history.push('/')
    }

    return (
        <div>
            <header>
                <div className="Header">
                    {!isMobile && <h4 onClick={onPressHome}>CADASTRO ACELERADO DE SAÚDE</h4>}
                    <UserAccessButton/>
                </div>
            </header>
            <body>
                <div className="Body">
                    {children}
                </div>
            </body>
        </div>
    )
}

export default BasePage