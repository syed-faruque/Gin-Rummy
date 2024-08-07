const useLayoff = (hands, userCollection, opponentCollection, userKnocked, opponentKnocked) => {

    const user_hand = hands.user_hand;
    const opponent_hand = hands.opponent_hand;
    const user_melds = userCollection.melds || [];
    const opponent_melds = opponentCollection.melds || [];
    const user_deadwood = userCollection.deadwood || [];
    const opponent_deadwood = opponentCollection.deadwood || [];

    const isRun = (cards) => {
        cards.sort((a, b) => a.value - b.value);
        const suit = cards[0].suit;
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].suit !== suit || cards[i].value !== cards[i - 1].value + 1) {
                return false;
            }
        }
        return true;
    }

    const isSet = (cards) => {
        const rank = cards[0].value;
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].value !== rank) {
                return false;
            }
        }
        return true;
    }

    const isMeld = (cards) => {
        return isRun(cards) || isSet(cards);
    }

    const findPartialRuns = (deadwood) => {
        let partialRuns = [];
        for (let i = 0; i < deadwood.length-1; i++) {
            const current = deadwood[i];
            let possiblePartialRun = [current];
            for (let j = i+1; j < deadwood.length; j++) {
                const next = deadwood[j];
                if ((current.suit === next.suit) && (Math.abs(next.value - current.value) === 1)) {
                    possiblePartialRun.push(next);
                    partialRuns.push(possiblePartialRun);
                }
            }
        }
        return partialRuns;
    }


    const findPartialRunIndexesToIndexesOfMeld = (melds, deadwood) => {
        const partialRuns = findPartialRuns(deadwood);
        let num_meld_cards = melds.flat().length;
        let partialRunIndexesToIndexesOfMeld = new Map();

        for (let i = 0; i < partialRuns.length; i++) {
            const currentPartialRun = partialRuns[i];
            const deadWoodIndexes = currentPartialRun.map(card => deadwood.findIndex(deadwoodCard => deadwoodCard.src === card.src))
            for (let j = 0; j < melds.length; j++) {
                const currentMeld = melds[j];
                const startConcatination = currentPartialRun.concat(currentMeld);
                const endConcatination = currentMeld.concat(currentPartialRun);
                if (isRun(startConcatination)) {
                    partialRunIndexesToIndexesOfMeld.set(deadWoodIndexes[0]+num_meld_cards, j);
                    partialRunIndexesToIndexesOfMeld.set(deadWoodIndexes[1]+num_meld_cards, j);
                }
                else if (isRun(endConcatination)) {
                    partialRunIndexesToIndexesOfMeld.set(deadWoodIndexes[0]+num_meld_cards, j);
                    partialRunIndexesToIndexesOfMeld.set(deadWoodIndexes[1]+num_meld_cards, j);
                }
            }
        }

        return partialRunIndexesToIndexesOfMeld;
    }


    const findAllIndexInSortedListToIndexOfMeld = (melds, deadwood) => {
        const indexInSortedListToIndexOfMeld = findPartialRunIndexesToIndexesOfMeld(melds, deadwood);
        let num_meld_cards = melds.flat().length;
        for (let i = 0; i < deadwood.length; i++) {
            const currentDeadwood = deadwood[i];
            if (indexInSortedListToIndexOfMeld.has(i)) {
                continue;
            }
            for (let j = 0; j < melds.length; j++) {
                const currentMeld = melds[j];
                const startConcatination = currentDeadwood.concat(currentMeld);
                const endConcatination = currentMeld.concat(currentDeadwood);
                if (isMeld(startConcatination)){
                    indexInSortedListToIndexOfMeld.set(i+num_meld_cards, j);
                }
                else if (isMeld(endConcatination)) {
                    indexInSortedListToIndexOfMeld.set(i+num_meld_cards, j);
                }
            }
        }

        return indexInSortedListToIndexOfMeld;
    }

    
    if (userKnocked) {
        const indexInSortedListToIndexOfMeld = findAllIndexInSortedListToIndexOfMeld(user_melds, opponent_deadwood);
    }

    else if (opponentKnocked) {
        const indexInSortedListToIndexOfMeld = findAllIndexInSortedListToIndexOfMeld(opponent_melds, user_deadwood);
    }
    
    

}

export default useLayoff;
