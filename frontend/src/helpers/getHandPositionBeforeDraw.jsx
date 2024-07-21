import getHandPosition from "./getHandPosition";

const getHandPositionBeforeDraw = (index, animationFromHand, windowSize) => {
    const moved_index = animationFromHand.card_index;
    const user = animationFromHand.user;
    let position;

    if (index >= moved_index) {
        index+=1;
    }
    user ? position = getHandPosition(index, true, animationFromHand.previous_hand_length, windowSize) : position = getHandPosition(index, false, animationFromHand.previous_hand_length, windowSize);
    return position;

}

export default getHandPositionBeforeDraw;