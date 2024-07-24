import useMeldsAndDeadwood from "../hooks/useMeldsAndDeadwood";

const MeldsAndDeadWoodTracker = ({
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

    const meldsAndDeadwoodData = useMeldsAndDeadwood(hands);
    const userRuns = meldsAndDeadwoodData.user_collection?.user_runs || [];
    const userSets = meldsAndDeadwoodData.user_collection?.user_sets || [];
    const deadwood = meldsAndDeadwoodData.user_collection?.user_deadwood || [];

    const windowHeight = windowSize.height;
    const marginMelds = windowHeight / 7;
    const marginDeadwood = windowHeight / 10;

    const styles = {
        label: {
            fontSize: '12px',
            color: 'white',
        },
        melds: {
            position: 'absolute',
            top: `${windowHeight - marginMelds}px`,
            left: '27.5%',
            display: 'flex',
            alignItems: 'center',
        },
        deadwood: {
            position: 'absolute',
            top: `${windowHeight - marginDeadwood}px`,
            left: '27.5%',
            display: 'flex',
            alignItems: 'center',
        },
        meld: {
            display: 'flex',
            margin: '5px',
            padding: '5px',
            borderRadius: '2px',
            backgroundColor: 'white',
        },
        cardSymbol: {
            fontSize: '12px',
        }
    };

    return (
        <div className="MeldsAndDeadwoodTracker">
            <div style={styles.melds}>
                <span style={styles.label}>Melds:</span>
                {userRuns.length > 0 && userRuns.map((meld, index) => (
                    <div key={`run-${index}`} style={styles.meld}>
                        {meld.map(card => (
                            <span key={card.value + card.suit} style={styles.cardSymbol}>
                                {card.symbol}
                            </span>
                        ))}
                    </div>
                ))}
                {userSets.length > 0 && userSets.map((meld, index) => (
                    <div key={`set-${index}`} style={styles.meld}>
                        {meld.map(card => (
                            <span key={card.value + card.suit} style={styles.cardSymbol}>
                                {card.symbol}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div style={styles.deadwood}>
                <span style={styles.label}>Deadwood:</span>
                <div style={styles.meld}>
                    {deadwood.length > 0 && deadwood.map(card => (
                        <span key={card.value + card.suit} style={styles.cardSymbol}>
                            {card.symbol}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MeldsAndDeadWoodTracker;
