import { CSSProperties, FC } from 'react';
import Lottie from 'react-lottie';
import EmptyLottieAnimation from '../../../assets/animations/empty.json';
import './style.css'

interface LoadingProps {
    style?: CSSProperties;
    text?: string;
}

const EmptyAnimation: FC<LoadingProps> = ({ style = { height: 200 }, text }) => (
    <div className="ContainerEmptyAnimation">
        <Lottie
            options={{
                animationData: EmptyLottieAnimation,
                autoplay: true,
                loop: true,
            }}
            isClickToPauseDisabled
            style={style}
        />
        <div className='TextEmptyAnimation'>{text}</div>
    </div>
)

export default EmptyAnimation