/**
 * @author Syed Faruque
 * created: July 15 2024
**/

import { useEffect, useState } from "react";

const useMeldsAndDeadwood = (hands) => {

    const user_hand = [...hands.user_hand];
    const opponent_hand = [...hands.opponent_hand];

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

    const calculateTotalValue = (cards) => {
        return cards.reduce((total, card) => total + card.value, 0);
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
    

    const findAllMeldCombinations = (cards) => {
        const result = [];
        for (const card of cards) {
            const newCombinations = [];
            for (const combination of result) {
                newCombinations.push([...combination, card]);
            }
            result.push(...newCombinations);
            result.push([card]);
        }
        const possibleMeldCombinations = result.filter(combo => combo.length >= 3);
        const meldCombinations = possibleMeldCombinations.filter(possibleMeld => isMeld(possibleMeld));
        return meldCombinations;
    }

    const findAllWorkingMeldCombinations = (cards) => {
        const allMeldCombinations = findAllMeldCombinations(cards);
        

    }


}

export default useMeldsAndDeadwood;
