/**
 * @author Syed Faruque
 * created: July 15 2024
**/

import { useEffect, useState } from "react";

const useMeldsAndDeadwood = (hands) => {

    const user_hand = [...hands.user_hand];
    const opponent_hand = [...hands.opponent_hand];
    const [userCollection, setUserCollection] = useState({user_melds: [], user_deadwood: []});
    const [opponentCollection, setOpponentCollection] = useState({opponent_melds: [], opponent_deadwood: []});

// checks if a list of cards is a run
    const isRun = (cards) => {
        cards.sort((a, b) => a.value - b.value); //sorts the list of cards by value
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
        cards.sort((a, b) => a.value - b.value); // sorts the list of cards by value
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
        const result = [];
        for (const element of arr) {
            const newCombinations = [];
            for (const combination of result) {
                newCombinations.push([...combination, element]);
            }
            result.push(...newCombinations);
            result.push([element]);
        }
        return result;
    }

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

// finds every possible meld in a list of cards
    const findAllPossibleMelds = (cards) => {
    // finds every possible combination of cards
        const allCardCombinations = findAllListCombinations(cards);
    // filters out combinations >= 3 only
        const groupings = allCardCombinations.filter(combo => combo.length >= 3);
    // filters out the ones that satisfy a meld
        const possibleMelds = groupings.filter(grouping => isMeld(grouping));
        return possibleMelds;
    }

// finds all meld combinations that do not contain an overlapping card
    const findAllWorkingMeldCombinations = (cards) => {
        const allPossibleMelds = findAllPossibleMelds(cards);
    // uses helper function to find all combinations of meld lists and store them in a central array
        const allMeldCombinations = findAllListCombinations(allPossibleMelds);
    // filters out working meld combinations from the array containing all meld combos
        const allWorkingMeldCombinations = allMeldCombinations.filter(meldlist => isWorkingMeldCombination(meldlist));
        return allWorkingMeldCombinations;
    }

// finds the highest value meld combination amongst all working meld combinations
    const findBestWorkingMeldCombination = (cards) => {
        const allWorkingMeldCombinations = findAllWorkingMeldCombinations(cards);
        let max_value = 0;
        let bestWorkingMeldCombination = allWorkingMeldCombinations[0];
    // loops through and updates max value and bestWorkingMeldCombination temp variables to reflect the optimal ones
        for (let i = 0; i < allWorkingMeldCombinations.length; i++) {
            const current_meld_combination = allWorkingMeldCombinations[i];
            const current_total = calculateTotalValueOfMeldCombination(current_meld_combination);
            if (current_total >= max_value) {
                max_value = current_total;
                bestWorkingMeldCombination = current_meld_combination;
            }
        }
        return bestWorkingMeldCombination;
    }

// finds the cards that are not part of the best possible meld combination
    const findDeadwoodPile = (cards, melds) => {
        if (!melds || !Array.isArray(melds)) {
            return cards;
        }
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
    
        setUserCollection({ user_melds: userMelds, user_deadwood: userDeadwood });
        setOpponentCollection({ opponent_melds: opponentMelds, opponent_deadwood: opponentDeadwood });
    
    }, [hands]);

    return [userCollection, opponentCollection];

}

export default useMeldsAndDeadwood;
