import { FC } from 'react';
import { useAuth } from '../../../resources/contexts/AuthContext';
import './style.css'

const UserAccessButton: FC = () => {
    const {isAuthenticated, name, logout} = useAuth()

    function onPressAccess() {
        window.location.pathname = '/login'
    }

    async function onPressToOpenList() {
      if(window.location.pathname !== '/relatorio') window.location.pathname = '/relatorio'
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
                <div>
                    <span onClick={onPressToOpenList}>RELATÓRIO</span>
                    <div className="dropdown">
                        <span className="dropbtn">{name}</span>
                        <div className="dropdown-content">
                            <div className='item-dropdown' onClick={onPressLogout} >sair</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default UserAccessButton;