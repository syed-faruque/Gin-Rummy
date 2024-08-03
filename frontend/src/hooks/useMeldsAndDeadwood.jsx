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
        cards.sort((a, b) => a.value - b.value);
        const rank = cards[0].value;
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].value !== rank) {
                return false;
            }
        }
        return true;
    }
    
    const isMeld = (cards) => {
        return isSet(cards) || isRun(cards);
    }

    const calculateTotalValueOfCards = (cards) => {
        return cards.reduce((total, card) => total + card.value, 0);
    }

    const calculateTotalValueOfMeldCombination = (meldlist) => {
        const flattened = meldlist.flat();
        const total_value = calculateTotalValueOfCards(flattened);
        return total_value;
    }

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

    const isOverlap = (cardlist1, cardlist2) => {
        for (let i = 0; i < cardlist1.length; i++) {
            for (let j = 0; j < cardlist2.length; j++) {
                if (cardlist2[j].src === cardlist1[i].src) {
                    return true;
                }
            }
        }
        return false;
    }

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


    const findAllPossibleMelds = (cards) => {
        const allCardCombinations = findAllListCombinations(cards);
        const groupings = allCardCombinations.filter(combo => combo.length >= 3);
        const possibleMelds = groupings.filter(grouping => isMeld(grouping));
        return possibleMelds;
    }

    const findAllWorkingMeldCombinations = (cards) => {
        const allPossibleMelds = findAllPossibleMelds(cards);
        const allMeldCombinations = findAllListCombinations(allPossibleMelds);
        const allWorkingMeldCombinations = allMeldCombinations.filter(meldlist => isWorkingMeldCombination(meldlist));
        return allWorkingMeldCombinations;
    }

    const findBestWorkingMeldCombination = (cards) => {
        const allWorkingMeldCombinations = findAllWorkingMeldCombinations(cards);
        let max_value = 0;
        let bestWorkingMeldCombination = allWorkingMeldCombinations[0];
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

    const findDeadwoodPile = (cards, melds) => {
        if (!melds || !Array.isArray(melds)) {
            return cards;
        }
        const flattened = melds.flat();
        const flattened_srcs = flattened.map(card => card.src);
        const deadwood = cards.filter(card => !flattened_srcs.includes(card.src));
        return deadwood;
    }

    useEffect(() => {
        if (!hands || !hands.user_hand || !hands.opponent_hand || !hands.user_hand.length > 0 || !hands.opponent_hand.length > 0) return;

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
