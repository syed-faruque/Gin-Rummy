import { useEffect } from "react";
import getHandPosition from "../helpers/getHandPosition";

const usePileListeners = (socket, windowSize, updateAnimationFromHand, updateAnimationToPileStartingPoint, updateLast, hands, updateHands, handsInitialized, deck, deckInitialized, pile, updatePile, pileInitialized) => {

    useEffect(() => {
        if (!deckInitialized || !handsInitialized || !pileInitialized) return;

        socket.on("discard-from-hand", (data) => {
            const card_pile = [...pile];
            const user_hand = [...hands.user_hand];
            const opponent_hand = [...hands.opponent_hand];
            const self = data.self;
            const index = data.index;
            const removeCardFromHandAndUpdate = (card_list) => {
                const discarded_card = card_list.splice(index, 1)[0];
                card_pile.push(discarded_card);
            }
            self 
                ? updateAnimationFromHand({active: true, card_index: index, previous_hand_length: hands.user_hand.length, user: true}) 
                : updateAnimationFromHand({active: true, card_index: index, previous_hand_length: hands.opponent_hand.length, user: false})

            self ? removeCardFromHandAndUpdate(user_hand) : removeCardFromHandAndUpdate(opponent_hand);
            
            self 
                ? updateAnimationToPileStartingPoint(getHandPosition(data.index, self, hands.user_hand.length, windowSize))
                : updateAnimationToPileStartingPoint(getHandPosition(data.index, self, hands.opponent_hand.length, windowSize));


            updateHands({user_hand, opponent_hand});
            updatePile(card_pile);
            updateLast({});

        })

    }, [socket, pile, hands, deck])
}

export default usePileListeners;