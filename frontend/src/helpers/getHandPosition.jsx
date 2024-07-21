const getHandPosition = (index, user, handLength, windowSize) => {
    
    let position;
    const cardWidth = 70;
    const cardHeight = 100;
    const overlapProportion = .5;
    const horizontalShift = overlapProportion * index * cardWidth;
    const lengthStack = cardWidth * handLength * overlapProportion;
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;
    const leftMargin = ((.5*(windowWidth - lengthStack)) - cardWidth/4) + horizontalShift;

    if (user) {
        position = {
            top: `${windowHeight - cardHeight - windowHeight/6}px`,
            left: `${leftMargin}px`
        }
    }
    else  {
        position = {
            top: `${windowHeight/6}px`,
            left: `${leftMargin}px`
        }
    }
    return position;

}

export default getHandPosition;
