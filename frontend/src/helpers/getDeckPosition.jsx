const getDeckPosition = (index, windowSize) => {

    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const cardHeight = 100;
    const cardWidth = 70;
    const shift = .25 * index;

    return ({
        top: `${.5*(windowHeight - cardHeight) - shift}px`,
        left: `${.5*(windowWidth- 2.2 * cardWidth) - shift}px`
    })
}

export default getDeckPosition;