import { useState, useEffect } from "react";

const useInitializeHands = (player, deck, updateDeck, deckInitialized, hands, updateHands, handsInitialized, updateHandsInitialized) => {

    const [dealTurn, setDealTurn] = useState(true);
    
    const player1_hand = player === 1 ? [...hands.user_hand] : [...hands.opponent_hand];
    const player2_hand = player === 1 ? [...hands.opponent_hand] : [...hands.user_hand];

    const dealCard = () => {
        const card_deck = [...deck];
        const top_card = card_deck.pop();
        updateDeck(card_deck);

        dealTurn ? player1_hand.push(top_card) : player2_hand.push(top_card);

        const updatedHands = player === 1
            ? { user_hand: player1_hand, opponent_hand: player2_hand }
            : { user_hand: player2_hand, opponent_hand: player1_hand };
        
        updateHands(updatedHands);
        setDealTurn(!dealTurn);

        if (player2_hand.length === 10) {
            updateHandsInitialized(true);
        }
    };

    useEffect(() => {
        if (!deckInitialized || handsInitialized) return;
        const timeoutId = setTimeout(dealCard, 300);
        return () => clearTimeout(timeoutId);
    }, [deckInitialized, dealTurn]);

};

export default useInitializeHands;