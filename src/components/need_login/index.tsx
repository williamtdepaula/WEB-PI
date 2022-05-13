import Button from '../button';
import './style.css'

const NeedLogin = () => {

    function onPressLogin(){
        window.location.pathname = '/login'
    }

    return (
        <div className='center'>
            <div className='ContainerNeedLogin'>
                <p>Você precisa estar logado para acessar essa página</p>
                <Button
                    onClick={onPressLogin}
                    title='Acessar'
                    styles={{width: '30%'}}
                />
            </div>
        </div>
    );
}

export default NeedLogin;