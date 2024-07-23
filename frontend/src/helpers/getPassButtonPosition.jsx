/**
 * @author Syed Faruque
 * created: July 10 2024
**/

const getPassButtonPosition = (windowSize) => {
    
    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const cardWidth = 70;
    const extraMargin = 2 * cardWidth;
    return ({
        top: `${(windowHeight/2) - 15}px`,
        left: `${.5*(windowWidth - cardWidth) + extraMargin}px`
    })
}

export default getPassButtonPosition;
