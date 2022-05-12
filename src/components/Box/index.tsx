import { CSSProperties, FC } from 'react';
import './style.css'

interface BoxProps {
    styles?: CSSProperties
}

const Box: FC<BoxProps> = ({children, styles}) => {
    return (
        <div className='ContainerForm' style={styles}>
            {children}
        </div>
    );
}

export default Box;