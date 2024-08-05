/**
 * @author Syed Faruque
 * created: July 7 2024
**/

// to keep the illusion that a card that is pulled is underneath the ones on its right and over the ones on its left
// the z index of all cards in the hand are mutated during a draw
// the implementation of this can be found in hands component

const useHandCardZIndex = (index, animationFromHand, userKnocked, opponentKnocked, sortedHandIndexes, stage) => {

    const {user_sorted_hand_indexes, opponent_sorted_hand_indexes} = sortedHandIndexes;
    if ((userKnocked || opponentKnocked) && stage == 3) return {user_z: (user_sorted_hand_indexes.indexOf(index)), opponent_z: (opponent_sorted_hand_indexes.indexOf(index))};
    if (!animationFromHand.active) return 1;
    if (index < animationFromHand.card_index) return 0;
    if (index > animationFromHand.card_index) return 20;
    return 10;
}

export default useHandCardZIndex;
