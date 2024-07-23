/**
 * @author Syed Faruque
 * created: July 5 2024
**/

import useInitializeHands from "../hooks/useInitializeHands";
import useHandListeners from "../hooks/useHandListeners";
import useHandCardZIndex from "../hooks/useHandCardZIndex";
import getHandPosition from "../helpers/getHandPosition";
import getHandPositionBeforeDraw from "../helpers/getHandPositionBeforeDraw";
import Card from "./Card";
import cardback from "../images/cardback.png";

const Hands = ({
    socket, player,
    deck, updateDeck,
    pile, updatePile,
    hands, updateHands,
    deckInitialized, updateDeckInitialized,
    pileInitialized, updatePileInitialized,
    handsInitialized, updateHandsInitialized,
    animationToHandStartingPoint, updateAnimationToHandStartingPoint,
    animationFromHand, updateAnimationFromHand,
    turn, updateTurn,
    stage, updateStage,
    last, updateLast,
    windowSize
}) => {

    useHandListeners(socket, player, windowSize, updateStage, updateLast, updateTurn, updateAnimationToHandStartingPoint, hands, updateHands, handsInitialized, deck, updateDeck, deckInitialized, pile, updatePile, pileInitialized);
    useInitializeHands(player, deck, updateDeck, deckInitialized, hands, updateHands, handsInitialized, updateHandsInitialized);

    const user_hand_length = hands.user_hand.length;
    const opponent_hand_length = hands.opponent_hand.length;

    const emitDiscardNotice = (index, turn, stage) => {
        const discarded_card = hands.user_hand[index];
        if (last.src != discarded_card.src && turn && stage == 2) {
            socket.emit("discard-from-hand", {index});
        }
    }

    return (
        <div className="hands">
            <div className="user-hand">
                {hands.user_hand && hands.user_hand.map((card, index) => (
                    <Card 
                        key = {index}
                        src = {card.src}
                        alt = {"user-hand-card"}
                        animationStartPoint = {animationToHandStartingPoint}
    /**
     * Just making clear, if a draw animation is active. I want all other cards to be fixed besides the card that was moved.
     * As a result, I set the final point to be the position before draw and I make the transition nullified during this period
    **/
                        animationFinalPoint = {(animationFromHand.active && animationFromHand.user) ? getHandPositionBeforeDraw(index, animationFromHand, windowSize) : getHandPosition(index, true, user_hand_length, windowSize)}
                        animationTime = {(animationFromHand.active && animationFromHand.user) ? {duration: 0} : {duration: 0.6}}
                        isAnimated = {true}
                        zIndex={useHandCardZIndex(index, animationFromHand)}
                        onClick={deckInitialized && pileInitialized && handsInitialized && !animationFromHand.active ? () => emitDiscardNotice(index, turn, stage) : null}
                    />
                ))}
            </div>
            <div className="opponent-hand">
                {hands.opponent_hand && hands.opponent_hand.map((card, index) => (
                    <Card 
                        key = {index}
                        src = {cardback}
                        alt = {"opponent-hand-card"}
                        animationStartPoint = {animationToHandStartingPoint}
    /**
     * Just making clear, if a draw animation is active. I want all other cards to be fixed besides the card that was moved.
     * As a result, I set the final point to be the position before draw and I make the transition nullified during this period
    **/
                        animationFinalPoint = {(animationFromHand.active && !animationFromHand.user) ? getHandPositionBeforeDraw(index, animationFromHand, windowSize) : getHandPosition(index, false, opponent_hand_length, windowSize)}
                        animationTime = {(animationFromHand.active && !animationFromHand.user) ? {duration: 0} : {duration: 0.6}}
                        zIndex={useHandCardZIndex(index, animationFromHand)}
                        isAnimated = {true}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hands;
