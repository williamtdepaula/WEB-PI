import { FC } from 'react';
import Button from '../button';
import './style.css'

interface ErrorPageProps {
    onPressTryAgain: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({onPressTryAgain}) => {
    return (
        <div className='center'>
            <div className='ContainerError'>
                <h3>Oops! Algo deu errado</h3>
                <Button
                    onClick={onPressTryAgain}
                    title='Tentar novamente'
                    styles={{width: '80%'}}
                />
            </div>
        </div>
    );
}

export default ErrorPage;