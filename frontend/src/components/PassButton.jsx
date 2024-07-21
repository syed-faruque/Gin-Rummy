import getPassButtonPosition from "../helpers/getPassButtonPosition";

const PassButton = ({
    socket, player,
    deck, updateDeck,
    pile, updatePile,
    hands, updateHands,
    deckInitialized, updateDeckInitialized,
    pileInitialized, updatePileInitialized,
    handsInitialized, updateHandsInitialized,
    turn, updateTurn,
    stage, updateStage,
    last, updateLast,
    windowSize
}) => {

    const handlePass = () => {
        socket.emit("pass-first-pick");
        updateTurn();
    }

    return (
        <div className="pass-button">
            {(stage === 0 && turn && pileInitialized) && (
                <button 
                    style={{ position: "absolute", ...getPassButtonPosition(windowSize) }} 
                    onClick={handlePass}
                >
                    Pass
                </button>
            )}
        </div>
    );
}

export default PassButton;
