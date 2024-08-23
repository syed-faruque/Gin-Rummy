import { useEffect, useState } from "react";
import getUserDeadwoodToOpponentMeldPairings from "../helpers/getUserDeadwoodToOpponentMeldPairings";

const useLaidOffCards = (userCollection, opponentCollection, userKnocked, opponentKnocked) => {

    const [userLaidOffCardParings, setUserLaidOffCardPairings] = useState(new Map());
    const [opponentLaidOffCardPairings, setOpponentLaidOffCardPairings] = useState(new Map());

    useEffect(() => {

        if (!userCollection || !opponentCollection) return;

        const userMelds = userCollection.melds || [];
        const userDeadwood = userCollection.deadwood || [];
        const opponentMelds = opponentCollection.melds || [];
        const opponentDeadwood = opponentCollection.deadwood || [];

        if (userKnocked) {
            const opponentPairings = getUserDeadwoodToOpponentMeldPairings(opponentDeadwood, userMelds);
            const updatedOpponentPairings = new Map();

            opponentPairings.forEach((meldIndex, deadwoodIndex) => {
                updatedOpponentPairings.set(opponentDeadwood[deadwoodIndex], userMelds[meldIndex]);
            });

            setOpponentLaidOffCardPairings(updatedOpponentPairings);
        } 
        
        else if (opponentKnocked) {
            const userPairings = getUserDeadwoodToOpponentMeldPairings(userDeadwood, opponentMelds);
            const updatedUserPairings = new Map();

            userPairings.forEach((meldIndex, deadwoodIndex) => {
                updatedUserPairings.set(userDeadwood[deadwoodIndex], opponentMelds[meldIndex]);
            });

            setUserLaidOffCardPairings(updatedUserPairings);
        }

    }, [userKnocked, opponentKnocked, userCollection, opponentCollection]);

    return [userLaidOffCardParings, opponentLaidOffCardPairings];
}

export default useLaidOffCards;
