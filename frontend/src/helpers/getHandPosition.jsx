/**
 * @author Syed Faruque
 * created: July 5 2024
**/

//~~~~~~~~~~~~ returns a cards position in the hand in pixels based off its index, whether its the user or opponent, the size of the hand, the size of the computer screen ~~~~~~~~~~~~~//

const getHandPosition = (index, user, handLength, windowSize) => {

// used math calculations here. Pay close attention. Should make sense.
    
    let position;
    const cardWidth = 70;
    const cardHeight = 100;
    const overlapProportion = .5;
    const horizontalShift = overlapProportion * index * cardWidth;
    const lengthStack = cardWidth * handLength * overlapProportion + cardWidth/2;
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;
    const leftMargin = (.5*(windowWidth - lengthStack)) + horizontalShift;

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
