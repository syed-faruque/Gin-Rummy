const getSortedHandIndexes = (hands, userCollection, opponentCollection) => {
    const user_hand = [...hands.user_hand];
    const user_melds = userCollection.user_melds || [];
    const user_deadwood = userCollection.user_deadwood || [];
    const opponent_hand = [...hands.opponent_hand];
    const opponent_melds = opponentCollection.opponent_melds || [];
    const opponent_deadwood = opponentCollection.opponent_deadwood || [];

    const getSortedIndexesList = (hand, melds, deadwood) => {
        let sortedIndexes = [];
        
        if (melds) {
            for (let i = 0; i < melds.length; i++) {
                for (let j = 0; j < melds[i].length; j++) {
                    sortedIndexes.push(hand.findIndex(card => card.src === melds[i][j].src));
                }
            }
        }

        if (deadwood) {
            for (let i = 0; i < deadwood.length; i++) {
                sortedIndexes.push(hand.findIndex(card => card.src === deadwood[i].src));
            }
        }

        return sortedIndexes;
    }

    const user_sorted_hand_indexes = getSortedIndexesList(user_hand, user_melds, user_deadwood) 
    const opponent_sorted_hand_indexes = getSortedIndexesList(opponent_hand, opponent_melds, opponent_deadwood);

    return {user_sorted_hand_indexes, opponent_sorted_hand_indexes};
}

export default getSortedHandIndexes;
