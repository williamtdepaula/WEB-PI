import { FC } from 'react';
import Button from '../button';
import './style.css'

interface ErrorPageProps {
    onPressTryAgain: () => void;
    description?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({onPressTryAgain, description}) => {
    return (
        <div className='center'>
            <div className='ContainerError'>
                <h3>{description ?? 'Oops! Algo deu errado'}</h3>
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