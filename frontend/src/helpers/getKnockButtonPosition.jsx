const getKnockButtonPosition = (windowSize) => {
    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const cardWidth = 70;
    const margin = windowHeight/7;
    const extraLeftMargin = 2.75 * cardWidth;

    return ({
        top: `${windowHeight-margin}px`,
        left: `${.5*(windowWidth - cardWidth) + extraLeftMargin}px`
    })
}

export default getKnockButtonPosition;
