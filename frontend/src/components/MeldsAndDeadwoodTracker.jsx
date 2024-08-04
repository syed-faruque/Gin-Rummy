/**
 * @author Syed Faruque
 * created: July 20 2024
**/

import useMeldsAndDeadwood from "../hooks/useMeldsAndDeadwood";
import useKnockData from "../hooks/useKnockData";

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

    const [userCollection, opponentCollection] = useMeldsAndDeadwood(hands);
    const user_melds = userCollection.user_melds || [];
    const user_deadwood = userCollection.user_deadwood || [];
    const knockData = useKnockData(userCollection, hands);
    const deadwood_total = knockData.deadwood_total;
    const windowHeight = windowSize.height;
    const marginMelds = windowHeight/7;
    const marginDeadwood = windowHeight/10;

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
        cardSymbol: (color) => ({
            fontSize: '12px',
            color: color,
        })
    };

    return (
        <div className="MeldsAndDeadwoodTracker">
            <div style={styles.melds}>
                <span style={styles.label}>Melds:</span>
                {user_melds.length > 0 && user_melds.map((meld, index) => (
                    <div key={`run-${index}`} style={styles.meld}>
                        {meld.map(card => (
                            <span key={card.value + card.suit} style={styles.cardSymbol(card.color)}>
                                {card.symbol}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div style={styles.deadwood}>
                <span style={styles.label}>Deadwood ({deadwood_total}):</span>
                <div style={styles.meld}>
                    {user_deadwood.length > 0 && user_deadwood.map(card => (
                        <span key={card.value + card.suit} style={styles.cardSymbol(card.color)}>
                            {card.symbol}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MeldsAndDeadWoodTracker;



