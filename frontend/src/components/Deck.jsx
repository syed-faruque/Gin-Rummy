import Card from "./Card";
import getDeckPosition from "../helpers/getDeckPosition";
import useInitializeDeck from "../hooks/useInitializeDeck";
import useWindowSize from  "../hooks/useWindowSize";
import cardback from "../images/cardback.png"

const Deck = ({
    socket, player,
    deck, updateDeck,
    pile, updatePile,
    hands, updateHands,
    deckInitialized, updateDeckInitialized,
    pileInitialized, updatePileInitialized,
    handsInitialized, updateHandsInitialized,
    turn, updateTurn,
    stage, updateStage,
    last, updateLast
}) => {

    useInitializeDeck(socket, updateDeck, updateDeckInitialized);
    const windowSize = useWindowSize();

    const emitDrawNotice = (turn, stage) => {
        if (stage == 1 && turn) {
            socket.emit("draw-from-deck");
        }
    }

    return(
        <div className="deck">
            {deck.length > 0 && deck.map((card, index) => {
                return (<Card
                    key = {index}
                    src = {cardback}
                    alt = {'deck-card'}
                    style = {getDeckPosition(index, windowSize)}
                    isAnimated = {false}
                    onClick = {deckInitialized && handsInitialized && pileInitialized ? () => emitDrawNotice(turn, stage) : null}
                />)
            })}
        </div>
    )
}

export default Deck;