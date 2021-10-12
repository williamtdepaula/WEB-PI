import { CSSProperties, FC } from 'react';
import Lottie from 'react-lottie';
import loadingWhiteAnimation from '../../assets/animations/loading_white.json';
import loadingBlueAnimation from '../../assets/animations/loading_blue.json';

interface LoadingProps {
    style?: CSSProperties;
    color: 'blue' | 'white'
}

const Loading: FC<LoadingProps> = ({ style = { height: 30 }, color }) => (
    <Lottie
        options={{
            animationData: color === 'blue' ? loadingBlueAnimation : loadingWhiteAnimation,
            autoplay: true,
            loop: true,
        }}
        isClickToPauseDisabled
        style={style}
    />
)

export default Loading