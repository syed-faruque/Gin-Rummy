/**
 * @author Syed Faruque
 * created: July 5 2024
**/

import Card from "./Card";
import useInitializePile from "../hooks/useInitializePile"
import usePileListeners from "../hooks/usePileListeners";
import getPilePosition from "../helpers/getPilePosition";

const Pile = ({
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

    useInitializePile(pile, pileInitialized, updatePile, updatePileInitialized, deck, updateDeck, deckInitialized, hands, handsInitialized);
    usePileListeners(socket, windowSize, updateAnimationFromHand, updateAnimationToPileStartingPoint, updateLast, hands, updateHands, handsInitialized, deck, deckInitialized, pile, updatePile, pileInitialized, updateUserKnocked, updateOpponentKnocked);

    const emitDrawNotice = (turn, stage) => {
        if (turn && (stage == 0 || stage == 1)) {
            socket.emit("draw-from-pile");
        }
    }

    return(
        <div className="pile">
            {pile && pile.map((card, index) => (
                <Card 
                    key = {index}
                    src = {card.src}
                    alt = {"pile-card"}
                    animationStartPoint={animationToPileStartingPoint}
                    animationFinalPoint={getPilePosition(index, windowSize)}
                    animationTime={{duration: 0.6}}
                    isAnimated={true}
                    onClick={deckInitialized && handsInitialized && pileInitialized ? () => emitDrawNotice(turn, stage) : null}

    // after animation from the hand to the pile. The animation.active needs to be set to false, everything else default values
                    callBack = {() => {
                        if ((userKnocked || opponentKnocked) && animationFromHand.active) {
                            updateStage(3);
                            updateAnimationFromHand({...animationFromHand, card_index: null, user: false, active: false})
                        }
                        else if (pileInitialized && stage == 2 && animationFromHand.active) {
                            updateTurn();
                            updateStage(1);
                            updateAnimationFromHand({...animationFromHand, card_index: null, user: false, active: false})
                        }
                    }}
                />
            ))}
        </div>
    )

}

export default Pile;
