/**
 * @author Syed Faruque
 * created: July 7 2024
**/

const useHandCardZIndex = (index, animationFromHand) => {
    if (!animationFromHand.active) return 1;
    if (index < animationFromHand.card_index) return 0;
    if (index > animationFromHand.card_index) return 20;
    return 10;
}

export default useHandCardZIndex;
