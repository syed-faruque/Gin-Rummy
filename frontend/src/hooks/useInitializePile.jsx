import {useState, useEffect} from "react";

const useInitializePile = (pile, pileInitialized, updatePile, updatePileInitialized, deck, updateDeck, deckInitialized, hands, handsInitialized) => {

    const initializePile = () => {
        const card_deck = [...deck];
        const top_card = card_deck.pop();
        const card_pile = [...pile];
        card_pile.push(top_card);
        updateDeck(card_deck);
        updatePile(card_pile);
        updatePileInitialized(true);
    }

    useEffect(() => {
        if (!handsInitialized || !deckInitialized || pileInitialized) return;
        const timeoutId = setTimeout(initializePile, 500);

        return(() => {
            clearTimeout(timeoutId);
        })
    }, [hands, deck, pile])
    

}

export default useInitializePile;