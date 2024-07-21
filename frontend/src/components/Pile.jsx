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
    animationToPileStartingPoint, updateAnimationToPileStartingPoint,
    animationFromHand, updateAnimationFromHand,
    turn, updateTurn,
    stage, updateStage,
    last, updateLast,
    windowSize
}) => {

    useInitializePile(pile, pileInitialized, updatePile, updatePileInitialized, deck, updateDeck, deckInitialized, hands, handsInitialized);
    usePileListeners(socket, windowSize, updateAnimationFromHand, updateAnimationToPileStartingPoint, updateLast, hands, updateHands, handsInitialized, deck, deckInitialized, pile, updatePile, pileInitialized);

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
                    callBack = {() => {
                        updateAnimationFromHand({...animationFromHand, card_index: null, user: false, active: false})
                        if (pileInitialized && stage == 2) {
                            updateTurn();
                            updateStage(1);
                        }
                    }}
                />
            ))}
        </div>
    )

}

export default Pile;