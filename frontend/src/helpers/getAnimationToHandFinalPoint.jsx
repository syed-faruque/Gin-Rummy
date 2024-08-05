import getHandPosition from "./getHandPosition";
import getHandPositionBeforeDraw from "./getHandPositionBeforeDraw";

const getAnimationToHandFinalPoint = (animationFromHand, windowSize, user_hand_length, opponent_hand_length, index, stage, userKnocked, opponentKnocked, sortedHandIndexes) => {

    const {user_sorted_hand_indexes, opponent_sorted_hand_indexes} = sortedHandIndexes;

    const userStandardHandPosition = getHandPosition(index, true, user_hand_length, windowSize);
    const opponentStandardHandPosition = getHandPosition(index, false, opponent_hand_length, windowSize);
    const userHandPositionBeforeDraw = getHandPositionBeforeDraw(index, animationFromHand, windowSize);
    const opponentHandPositionBeforeDraw = getHandPositionBeforeDraw(index, animationFromHand, windowSize);
    const userSortedHandPosition = getHandPosition((user_sorted_hand_indexes.indexOf(index)), true, user_hand_length, windowSize);
    const opponentSortedHandPosition = getHandPosition((opponent_sorted_hand_indexes.indexOf(index)), false, opponent_hand_length, windowSize);

    if ((userKnocked || opponentKnocked) && !animationFromHand.active) {
        return {userAnimationToHandFinalPoint: userSortedHandPosition, opponentAnimationToHandFinalPoint: opponentSortedHandPosition}
    }
    else if (animationFromHand.active && animationFromHand.user) {
        return {userAnimationToHandFinalPoint: userHandPositionBeforeDraw, opponentAnimationToHandFinalPoint: opponentStandardHandPosition}
    }
    else if (animationFromHand.active && !animationFromHand.user) {
        return {userAnimationToHandFinalPoint: userStandardHandPosition, opponentAnimationToHandFinalPoint: opponentHandPositionBeforeDraw}
    }
    else {
        return {userAnimationToHandFinalPoint: userStandardHandPosition, opponentAnimationToHandFinalPoint: opponentStandardHandPosition}
    }

}

export default getAnimationToHandFinalPoint;
