const getUserDeadwoodToOpponentMeldPairings = (user_deadwood, opponent_melds) => {

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
        return isSet(cards) || isRun(cards);
    }


    const findSemiPairs = (user_deadwood) => {
        const semi_pair_indexes = [];
        for (let i = 0; i < user_deadwood.length - 1; i++) {
            for (let j = i + 1; j < user_deadwood.length; j++) {
                if (user_deadwood[i].suit === user_deadwood[j].suit && Math.abs(user_deadwood[i].value - user_deadwood[j].value) === 1) {
                    semi_pair_indexes.push([i, j]);
                }
            }
        }
        return semi_pair_indexes;
    }



    const listOfCardsFitIntoMeld = (listOfCards, meld) => {
        const startConcatination = listOfCards.concat(meld);
        const endConcatination = meld.concat(listOfCards);
        if (isMeld(startConcatination) || isMeld(endConcatination)) {
            return true;
        }
        return false;
    }


    const findSemiPairPairings = (user_deadwood, opponent_melds) => {
        const semiPairPairings = new Map();
        const semi_pair_indexes = findSemiPairs(user_deadwood);

        for (let i = 0; i < semi_pair_indexes.length; i++) {
            for (let j = 0; j < opponent_melds.length; j++) {
                const pairing_cards = semi_pair_indexes[i].map(index => user_deadwood[index]);
                if (listOfCardsFitIntoMeld(pairing_cards, opponent_melds[j])) {
                    semiPairPairings.set(semi_pair_indexes[i][0], j);
                    semiPairPairings.set(semi_pair_indexes[i][1], j);
                }
            }
        }
        return semiPairPairings;
    }

    const findAllPairings = (user_deadwood, opponent_melds) => {
        const pairings = findSemiPairPairings(user_deadwood, opponent_melds);
        console.log(pairings);
        for (let i = 0; i < user_deadwood.length; i++) {
            for (let j = 0; j < opponent_melds.length; j++) {
                if (listOfCardsFitIntoMeld([user_deadwood[i]], opponent_melds[j]) && !(pairings.has(i))) {
                    pairings.set(i, j);
                }
            }
        }
        return pairings;
    }

    const pairings = findAllPairings([...user_deadwood], [...opponent_melds]);

    return pairings;

}

export default getUserDeadwoodToOpponentMeldPairings;
