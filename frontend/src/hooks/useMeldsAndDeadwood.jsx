/**
 * @author Syed Faruque
 * created: July 15 2024
**/

import { useEffect, useState } from "react";

const useMeldsAndDeadwood = (hands) => {
    let user_hand = [...hands.user_hand];
    let opponent_hand = [...hands.opponent_hand];

    const [meldsAndDeadwood, setMeldsAndDeadwood] = useState({});

// filters out cards in a list of melds from the hands list. This allows for deadwood list formation.
    const findRemainingHand = (melds, hand) => {
        let meldedCards = melds.flat();
        return hand.filter(handCard => !meldedCards.some(meldedCard => meldedCard.src === handCard.src));
    }

    const findRuns = (hand) => {
        let runs = [];
        let potential_run = [];

        for (let i = 0; i < hand.length-1; i++) {
            let same_suit = [hand[i]];

// finds all the cards with the same suit as card at current index and stores it
            for (let j = i + 1; j < hand.length; j++) {
                if (hand[j].suit === hand[i].suit) {
                    same_suit.push(hand[j]);
                }
            }

// sorts the list of cards in the same suit based on their value
            same_suit.sort((a, b) => a.value - b.value);


// stores all consecutive pairings in potential_run. Then checks if its 3 or more
            potential_run = [same_suit[0]];
            for (let j = 1; j < same_suit.length; j++) {
                if (same_suit[j].value === same_suit[j - 1].value + 1) {
                    potential_run.push(same_suit[j]);
                } 
                else {
                    if (potential_run.length >= 3) {
                        runs.push([...potential_run]);
                    }
                    potential_run = [same_suit[j]];
                }
            }

            if (potential_run.length >= 3) {
                runs.push([...potential_run]);
            }
        }

        const remainingHand = findRemainingHand(runs, hand);

        return { runs, remainingHand };
    };

    const findSets = (hand) => {
        let sets = [];
        
        for (let i = hand.length - 1; i >= 0; i--) {
            let same_value = [hand[i]];
    
            // Find all cards with the same value as the card at current index
            for (let j = i - 1; j >= 0; j--) {
                if (hand[j].value === hand[i].value) {
                    same_value.push(hand[j]);
                }
            }
    
            // If that list of cards with the same value is >= 3, it qualifies as a set
            if (same_value.length >= 3) {
                sets.push([...same_value]);
            }
        }

        const remainingHand = findRemainingHand(sets, hand);
    
        return { sets, remainingHand};
    };


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updates and returns state ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    useEffect(() => {
        const user_run_data = findRuns(user_hand);
        const user_runs = user_run_data.runs;
        user_hand = user_run_data.remainingHand;

        const user_set_data = findSets(user_hand);
        const user_sets = user_set_data.sets;
        user_hand = user_set_data.remainingHand;

        const opponent_run_data = findRuns(opponent_hand);
        const opponent_runs = opponent_run_data.runs;
        opponent_hand = opponent_run_data.remainingHand;

        const opponent_set_data = findSets(opponent_hand);
        const opponent_sets = opponent_set_data.sets;
        opponent_hand = opponent_set_data.remainingHand;

        const user_deadwood = user_hand;
        const opponent_deadwood = opponent_hand;

        setMeldsAndDeadwood({
            user_collection: { user_runs, user_sets, user_deadwood },
            opponent_collection: { opponent_runs, opponent_sets, opponent_deadwood }
        });
    }, [hands]);

    return meldsAndDeadwood;
};

export default useMeldsAndDeadwood;
