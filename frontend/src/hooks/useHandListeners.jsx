/**
 * @author Syed Faruque
 * created: July 10 2024
**/


//~~~~~~~~~~ this hook takes action when the server allerts a move made by the opponent or the user that involves adding to the hand ~~~~~~//

import { useEffect } from "react";
import getDeckPosition from "../helpers/getDeckPosition";
import getPilePosition from "../helpers/getPilePosition";

const useHandListeners = (socket, player, windowSize, updateStage, updateLast, updateTurn, updateAnimationToHandStartingPoint, hands, updateHands, handsInitialized, deck, updateDeck, deckInitialized, pile, updatePile, pileInitialized) => {

    useEffect(() => {
        if (!deckInitialized || !handsInitialized || !pileInitialized) return;

// when a card is drawed from the deck. The last index in the deck list is pulled off and appended to the user or opponent hand.
        socket.on("draw-from-deck", (data) => {
            updateAnimationToHandStartingPoint(getDeckPosition(deck.length-1, windowSize));
            updateStage(2);
        
            const card_deck = [...deck];
            const user_hand = [...hands.user_hand];
            const opponent_hand = [...hands.opponent_hand];
            const top_card = card_deck.pop();
        
            updateDeck(card_deck);
            
            (data.self) ? user_hand.push(top_card) : opponent_hand.push(top_card);
        
            updateHands({ user_hand, opponent_hand });
        });
        
// when a card is drawed from the pile. The last index in the pile list is pulled off and appended to the user or opponent hand.
        socket.on("draw-from-pile", (data) => {
            updateAnimationToHandStartingPoint(getPilePosition(pile.length-1, windowSize));
            updateStage(2);
            const card_pile = [...pile];
            const user_hand = [...hands.user_hand];
            const opponent_hand = [...hands.opponent_hand];
            const top_card = card_pile.pop();

            updatePile(card_pile);
            updateLast(top_card);

            (data.self) ? user_hand.push(top_card) : opponent_hand.push(top_card);

            updateHands({ user_hand, opponent_hand});
        })

// when the pass happens twice, the card on the pile is automatically pushed onto player one's hand
        socket.on("pass-first-pick", (data) => {
            updateAnimationToHandStartingPoint(getPilePosition(pile.length-1, windowSize));
            const card_pile = [...pile];
            const user_hand = [...hands.user_hand];
            const opponent_hand = [...hands.opponent_hand];
            const limit_exceeded = ((player === 2 && data.self) || (player === 1 && !data.self));
            const switchTurnAndUpdate = () => {
                const top_card = card_pile.pop();
                updatePile(card_pile);
                updateLast(top_card);
                (data.self) ? opponent_hand.push(top_card) : user_hand.push(top_card);
                updateStage(2);
                updateTurn();
            }

            limit_exceeded ? switchTurnAndUpdate() : updateTurn();

            updateHands({user_hand, opponent_hand});
        })

    }, [socket, pile, hands, deck])
}

export default useHandListeners;
