import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../resources/contexts';
import './style.css'

const UserAccessButton: FC = () => {
    const {isAuthenticated, name, logout} = useAuth()

    const history = useHistory()

    function onPressAccess() {
        
        window.location.pathname = '/login'
    }

    async function onPressLogout() {
        await logout()
    }

    return (
        <div className='ContainerUserAccessButton'>
            {!isAuthenticated 
                ?
                    <span onClick={onPressAccess}>ACESSAR</span>
                :
                    <span onClick={onPressLogout}>{name}</span>
            }
        </div>
    );
}

export default UserAccessButton;