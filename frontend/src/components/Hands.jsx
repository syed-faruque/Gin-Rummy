import useInitializeHands from "../hooks/useInitializeHands";
import useHandListeners from "../hooks/useHandListeners";
import useHandCardZIndex from "../hooks/useHandCardZIndex";
import getSortedHandIndexes from "../helpers/getSortedHandIndexes";
import useMeldsAndDeadwood from "../hooks/useMeldsAndDeadwood";
import getAnimationToHandFinalPoint from "../helpers/getAnimationToHandFinalPoint";
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
    animationToPileStartingPoint, updateAnimationToPileStartingPoint,
    animationFromHand, updateAnimationFromHand,
    userKnocked, updateUserKnocked,
    opponentKnocked, updateOpponentKnocked,
    turn, updateTurn,
    stage, updateStage,
    last, updateLast,
    windowSize
}) => {

    useHandListeners(socket, player, windowSize, updateStage, updateLast, updateTurn, updateAnimationToHandStartingPoint, hands, updateHands, handsInitialized, deck, updateDeck, deckInitialized, pile, updatePile, pileInitialized);
    useInitializeHands(player, deck, updateDeck, deckInitialized, hands, updateHands, handsInitialized, updateHandsInitialized);

    const user_hand_length = hands.user_hand.length;
    const opponent_hand_length = hands.opponent_hand.length;
    const [userCollection, opponentCollection] = useMeldsAndDeadwood(hands);
    const sortedHandIndexes = getSortedHandIndexes(hands, userCollection, opponentCollection);

    const getFinalPoint = (index, user) => {
        const {userAnimationToHandFinalPoint, opponentAnimationToHandFinalPoint} = getAnimationToHandFinalPoint(animationFromHand, windowSize, user_hand_length, opponent_hand_length, index, stage, userKnocked, opponentKnocked, sortedHandIndexes);
        if (user) {
            return userAnimationToHandFinalPoint;
        }
        else {
            return opponentAnimationToHandFinalPoint;
        }
    }

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
                        animationFinalPoint = {getFinalPoint(index, true)}
                        animationTime = {(animationFromHand.active && animationFromHand.user && !(stage == 3)) ? {duration: 0} : {duration: 0.6}}
                        isAnimated = {true}
                        zIndex={((userKnocked || opponentKnocked) && stage == 3) ? useHandCardZIndex(index, animationFromHand, userKnocked, opponentKnocked, sortedHandIndexes, stage).user_z: useHandCardZIndex(index, animationFromHand, userKnocked, opponentKnocked, sortedHandIndexes, stage)}
                        onClick={deckInitialized && pileInitialized && handsInitialized && !animationFromHand.active ? () => emitDiscardNotice(index, turn, stage) : null}
                    />
                ))}
            </div>
            <div className="opponent-hand">
                {hands.opponent_hand && hands.opponent_hand.map((card, index) => (
                    <Card 
                        key = {index}
                        src = {(stage == 3) ? card.src : cardback}
                        alt = {"opponent-hand-card"}
                        animationStartPoint = {animationToHandStartingPoint}
                        animationFinalPoint = {getFinalPoint(index, false)}
                        animationTime = {(animationFromHand.active && !animationFromHand.user && !(stage == 3)) ? {duration: 0} : {duration: 0.6}}
                        zIndex={((userKnocked || opponentKnocked) && stage == 3) ? useHandCardZIndex(index, animationFromHand, userKnocked, opponentKnocked, sortedHandIndexes, stage).opponent_z: useHandCardZIndex(index, animationFromHand, userKnocked, opponentKnocked, sortedHandIndexes, stage)}
                        isAnimated = {true}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hands;
