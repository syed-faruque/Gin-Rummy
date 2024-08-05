import useMeldsAndDeadwood from "../hooks/useMeldsAndDeadwood"
import useKnockData from "../hooks/useKnockData";
import getKnockButtonPosition from "../helpers/getKnockButtonPosition";

const KnockButton = ({
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

    const [userCollection, opponentCollection] = useMeldsAndDeadwood(hands);
    const knockData = useKnockData(userCollection, hands);
    const knockReady = knockData.ready;

    const handleKnock = () => {
        socket.emit("knock", {index_max_value_card: knockData.index_max_value_card});
    }

    return(
        <div className="knock-button">
            {(knockReady && stage == 2 && turn && !animationFromHand.active) && (
                <button 
                    style={{ position: "absolute", ...getKnockButtonPosition(windowSize) }} 
                    onClick={handleKnock}
                >
                    Knock
                </button>
            )}
        </div>
    )
}

export default KnockButton;
