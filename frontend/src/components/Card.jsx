import {useEffect, useState} from "react";
import {motion} from "framer-motion"

const Card = ({
    src,
    alt,
    isAnimated,
    animationStartPoint,
    animationFinalPoint,
    animationTime,
    callBack, 
    style,
    zIndex,
    onClick
}) => {

    const [localZIndex, setLocalZIndex] = useState(zIndex);

    useEffect(() => {
        if (isAnimated) setLocalZIndex(zIndex);
    }, [isAnimated, zIndex])

    const cardStyle = {
        width: '70px',
        height: '100px',
        position: 'absolute',
        zIndex: localZIndex,
        ...style
    };

    if (isAnimated) {
        return (
            <motion.img
                src={src}
                alt={alt}
                style={cardStyle}
                onClick={onClick}
                initial={animationStartPoint}
                animate={animationFinalPoint}
                transition={animationTime}
                onAnimationComplete={callBack}
            />
        );
    } 
    
    else {
        return (
            <img
                src={src}
                alt={alt}
                style={cardStyle}
                onClick={onClick}
            />
        );
    }

}

export default Card;