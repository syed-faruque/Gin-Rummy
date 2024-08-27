import { useState, useEffect } from "react";
import useLaidOffCards from "../hooks/useLaidOffCards";
import getRoundResults from "../helpers/getRoundResults";
import useMeldsAndDeadwood from "../hooks/useMeldsAndDeadwood";
import getDeckPosition from "../helpers/getDeckPosition";

const ScoreBoard = ({
    player, socket,
    hands, deck,
    userKnocked, updateUserKnocked,
    opponentKnocked, updateOpponentKnocked,
    updateDeck, updatePile, updateHands,
    updateTurn, updateStage, updateLast,
    updateDeckInitialized, updateHandsInitialized, updatePileInitialized,
    updateAnimationToPileStartingPoint, windowSize
}) => {

    const [timer, setTimer] = useState(20);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }

        if (timer == 0) {
            socket.emit("new-round");
            updateDeck([]);
            updatePile([]);
            updateHands({user_hand: [], opponent_hand: []});
            updateAnimationToPileStartingPoint(getDeckPosition(deck.length-1, windowSize));
            updateDeckInitialized(false);
            updatePileInitialized(false);
            updateHandsInitialized(false);
            updateTurn(player == 1);
            updateStage(0);
            updateLast({});
            updateUserKnocked(false);
            updateOpponentKnocked(false);
        }
    }, [timer]);

    const [userCollection, opponentCollection] = useMeldsAndDeadwood(hands);
    const [userLaidOffCardParings, opponentLaidOffCardPairings] = useLaidOffCards(userCollection, opponentCollection, userKnocked, opponentKnocked);
    const user_deadwood = userCollection.deadwood || [];
    const opponent_deadwood = opponentCollection.deadwood || [];

    let laid_off_cards;
    let receiving_melds;

    let roundResults;
    let playerWon;
    let isUndercut;
    let point_difference;
    
    if (userKnocked) {
        const knocking_deadwood = user_deadwood;
        const non_knocking_deadwood = opponent_deadwood;
        const laid_off_card_pairings = opponentLaidOffCardPairings;
        laid_off_cards = Array.from(laid_off_card_pairings.keys()) || [];
        receiving_melds = Array.from(laid_off_card_pairings.values());
        roundResults = getRoundResults(laid_off_cards, knocking_deadwood, non_knocking_deadwood);
        if (roundResults.knocker_won) {
            playerWon = true;
            isUndercut = false;
        } 
        else {
            playerWon = false;
            isUndercut = true;
        }
        point_difference = roundResults.point_difference;
    } 
    else if (opponentKnocked) {
        const knocking_deadwood = opponent_deadwood;
        const non_knocking_deadwood = user_deadwood;
        const laid_off_card_pairings = userLaidOffCardParings;
        laid_off_cards = Array.from(laid_off_card_pairings.keys()) || [];
        receiving_melds = Array.from(laid_off_card_pairings.values());
        roundResults = getRoundResults(laid_off_cards, knocking_deadwood, non_knocking_deadwood);
        if (roundResults.knocker_won) {
            playerWon = false;
            isUndercut = false;
        } 
        else {
            playerWon = true;
            isUndercut = true;
        }
        point_difference = roundResults.point_difference;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    flexDirection: "column",
                    backgroundColor: "#ffeb3b",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    maxWidth: "80%",
                }}
            >
                <div
                    className="deadwood-comparison"
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "20px",
                    }}
                >
                    {(roundResults && playerWon && userKnocked) && (
                        <div>
                            You won by knocking with a deadwood difference of {point_difference}
                        </div>
                    )}
                    {(roundResults && !playerWon && userKnocked) && (
                        <div>
                            You lost by undercut. Opponent has {point_difference} less deadwood points
                        </div>
                    )}
                    {(roundResults && playerWon && opponentKnocked) && (
                        <div>
                            You won by undercut with a deadwood difference of {point_difference}
                        </div>
                    )}
                    {(roundResults && !playerWon && opponentKnocked) && (
                        <div>
                            Opponent won by knocking with a deadwood difference of {point_difference}
                        </div>
                    )}
                </div>
                <div
                    className="laid-off-card-pairings"
                >
                    {roundResults && laid_off_cards.length > 0 ? (
                        <div style={{
                            display: "inline-block",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#333",
                            marginTop: "10px",
                        }}>
                            {userKnocked && !opponentKnocked && "Opponent's laid off cards:"}
                            {opponentKnocked && !userKnocked && "Laid off cards:"}
                            {laid_off_cards.map((card, index) => (
                                <div
                                    key={card.value + card.suit}
                                    style={{
                                        display: "inline-block",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        color: "#333",
                                        marginLeft: "20px",
                                    }}
                                >
                                    {card.symbol} ➜ {receiving_melds[index].map((card) => (
                                        card.symbol
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span
                            style={{
                                display: "inline-block",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#333",
                            }}
                        >
                            No cards were laid off
                        </span>
                    )}
                </div>
                <div
                    className="timer"
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#333",
                        marginTop: "20px",
                    }}
                >
                    Next round starts in: {timer} seconds
                </div>
            </div>
        </div>
    );
}

export default ScoreBoard;
