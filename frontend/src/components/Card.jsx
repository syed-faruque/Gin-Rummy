/**
 * @author Syed Faruque
 * created: July 5 2024
**/

import {useEffect, useState} from "react";
import {motion} from "framer-motion"


// a card can either be animated or have a fixed position. This component will be used inside Deck, Hands, and Pile....

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

//~~~~~~~~~~~~~ animated and non animated jsx ~~~~~~~~~~~~~~~~~~//
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
