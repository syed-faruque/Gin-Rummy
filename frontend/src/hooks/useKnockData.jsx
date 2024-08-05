import { useEffect, useState } from "react";

const useKnockData = (userCollection, hands) => {
    const [knockData, setKnockData] = useState({
        ready: false,
        deadwood_total: 0,
        index_max_value_card: null
    });

    useEffect(() => {
        if (!hands) return
        const user_hand = hands.user_hand || [];
        const deadwood = userCollection.user_deadwood || [];

        const deadwood_total = deadwood.reduce((total, card) => 
            (card.value === 11 || card.value === 12 || card.value === 13) // the value of Q, K, and J are 10 even though I set their properties different
            ? total + 10 
            : total + card.value, 0
        );

        let max_value_card = null;
        let index_card = null;
        let max_value = 0;

        for (let i = 0; i < deadwood.length; i++) {
            const card = deadwood[i];
            if (card.value > max_value) {
                max_value = card.value;
                max_value_card = card;
                index_card = user_hand.findIndex(userCard => userCard.src === card.src);
            }
        }
        const isFaceCard = (max_value_card && (max_value_card.value == 11 || max_value_card.value == 12 || max_value_card.value == 13));
        if (isFaceCard) max_value = 10; // the value of Q, K, and J are 10 even though I set their properties different

        const knockReady = ((deadwood_total - max_value) <= 10) && (hands.user_hand.length >= 10);

        setKnockData({
            ready: knockReady,
            deadwood_total,
            index_max_value_card: index_card
        });

    }, [userCollection]);

    return knockData;
}

export default useKnockData;
