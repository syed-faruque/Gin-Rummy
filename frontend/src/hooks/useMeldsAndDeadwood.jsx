/**
 * @author Syed Faruque
 * created: July 15 2024
**/

import { useEffect, useState } from "react";

const useMeldsAndDeadwood = (hands) => {
    
    const [userCollection, setUserCollection] = useState({melds: [], deadwood: []});
    const [opponentCollection, setOpponentCollection] = useState({melds: [], deadwood: []});

    
// checks if a list of cards is a run
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

    
// checks if a list of cards is a set
    const isSet = (cards) => {
        const rank = cards[0].value;
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].value !== rank) {
                return false;
            }
        }
        return true;
    }

    
// checks if a list of cards is either a run or a set
    const isMeld = (cards) => {
        return isSet(cards) || isRun(cards);
    }

    
// finds the total value of a list of cards
    const calculateTotalValueOfCards = (cards) => {
        return cards.reduce((total, card) => total + card.value, 0);
    }

    
// finds the total value of a list of melds. The list of melds is a two-d array
    const calculateTotalValueOfMeldCombination = (meldlist) => {
        const flattened = meldlist.flat();
        const total_value = calculateTotalValueOfCards(flattened);
        return total_value;
    }

    
// turns an array into a two dimensional array containing every possible combination of elements in the array as an array
const findAllListCombinations = (arr) => {
    const result = [[]];
    for (const element of arr) {
        const newCombinations = result.map(combination => [...combination, element]);
        result.push(...newCombinations);
    }
    return result.slice(1);
};

    
// checks whether a list of melds contains an overlapping card
    const isWorkingMeldCombination = (meldlist) => {
        const flattened = meldlist.flat();
        for (let i = 0; i < flattened.length-1; i++) {
            for (let j = i+1; j < flattened.length; j++) {
                if (flattened[i].src === flattened[j].src) {
                    return false;
                }
            }
        }
        return true;
    }


// finds the number of runs in a list of melds
    const findRunAmount = (meldlist) => {
        let count = 0;
        for (let i = 0; i < meldlist.length; i++) {
            if (isRun(meldlist[i])){
                count ++;
            }
        }
        return count;
    }

// finds every possible meld within a list of cards
    function findAllPossibleMelds(cards) {
        const result = [];
        const n = cards.length;

        // Iterate over all possible combinations using bitmasks
        for (let mask = 0; mask < (1 << n); mask++) {
            const combo = [];

            // Build the combination based on the current mask
            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    combo.push(cards[i]);
                }
            }

            // Only consider combinations of 3 or more cards
            if (combo.length >= 3 && isMeld(combo)) {
                result.push([...combo]);
            }
        }

        return result;
}
    


    
// finds all meld combinations that do not contain an overlapping card
    const findAllWorkingMeldCombinations = (cards) => {
        const allPossibleMelds = findAllPossibleMelds(cards);
        const allMeldCombinations = findAllListCombinations(allPossibleMelds);
        const allWorkingMeldCombinations = allMeldCombinations.filter(meldlist => isWorkingMeldCombination(meldlist));
        return allWorkingMeldCombinations;
    }

    
// finds the highest value meld combination amongst all working meld combinations
    const findBestWorkingMeldCombination = (cards) => {
        const allWorkingMeldCombinations = findAllWorkingMeldCombinations(cards);
        let max_value = 0;
        let bestWorkingMeldCombination = allWorkingMeldCombinations[0];
        for (let i = 0; i < allWorkingMeldCombinations.length; i++) {
            const current_meld_combination = allWorkingMeldCombinations[i];
            const current_total = calculateTotalValueOfMeldCombination(current_meld_combination);
            if (current_total > max_value) {
                max_value = current_total;
                bestWorkingMeldCombination = current_meld_combination;
            }
            else if (current_total == max_value) {
                if (findRunAmount(bestWorkingMeldCombination) < findRunAmount(current_meld_combination)) {
                    bestWorkingMeldCombination = current_meld_combination;
                }
            }
        }
        return bestWorkingMeldCombination;
    }

    
// finds the cards that are not part of the best possible meld combination
    const findDeadwoodPile = (cards, melds) => {
        if (!melds) return cards;
        const flattened = melds.flat();
        const flattened_srcs = flattened.map(card => card.src);
        const deadwood = cards.filter(card => !flattened_srcs.includes(card.src));
        return deadwood;
    }

    
// recalculate every time hands change and return state
    useEffect(() => {
        if (!hands || !hands.user_hand || !hands.opponent_hand) return;
        const userHand = [...hands.user_hand];
        const opponentHand = [...hands.opponent_hand];
        const userMelds = findBestWorkingMeldCombination(userHand);
        const userDeadwood = findDeadwoodPile(userHand, userMelds);
        const opponentMelds = findBestWorkingMeldCombination(opponentHand);
        const opponentDeadwood = findDeadwoodPile(opponentHand, opponentMelds);
        setUserCollection({ melds: userMelds, deadwood: userDeadwood });
        setOpponentCollection({ melds: opponentMelds, deadwood: opponentDeadwood });
    
    }, [hands]);

    return [userCollection, opponentCollection];

}

export default useMeldsAndDeadwood;
