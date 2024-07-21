const getPilePosition = (index, windowSize) => {

    const cardWidth = 70;
    const cardHeight = 100;
    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const shift = .25 * index;
    const extraMargin = cardWidth/2 - 1.2 * cardWidth

    return ({
        top: `${.5*(windowHeight - cardHeight) - shift}px`,
        left: `${.5*(windowWidth - cardWidth) - shift - extraMargin}px`
    })
}

export default getPilePosition;