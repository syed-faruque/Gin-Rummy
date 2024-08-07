import {useState, useEffect} from "react";

const useSortedHandIndexes = (hands, userCollection, opponentCollection) => {
    const user_hand = [...hands.user_hand];
    const user_melds = userCollection.melds || [];
    const user_deadwood = userCollection.deadwood || [];
    const opponent_hand = [...hands.opponent_hand];
    const opponent_melds = opponentCollection.melds || [];
    const opponent_deadwood = opponentCollection.deadwood || [];

    const [userSortedHandIndexes, setUserSortedHandIndexes] = useState([]);
    const [opponentSortedHandIndexes, setOpponentSortedHandIndexes] = useState([]);

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
    
    useEffect(() => {
        setUserSortedHandIndexes(getSortedIndexesList(user_hand, user_melds, user_deadwood));
        setOpponentSortedHandIndexes(getSortedIndexesList(opponent_hand, opponent_melds, opponent_deadwood));
    }, [userCollection, opponentCollection])

    return {user_sorted_hand_indexes: userSortedHandIndexes, opponent_sorted_hand_indexes: opponentSortedHandIndexes};
}

export default useSortedHandIndexes;
