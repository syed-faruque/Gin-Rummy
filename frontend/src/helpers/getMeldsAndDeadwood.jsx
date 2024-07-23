const getMeldsAndDeadwood = (hands) => {
    let user_hand = [...hands.user_hand];
    let opponent_hand = [...hands.opponent_hand];

    const findRuns = (hand) => {
        let runs = [];
        let potential_run = [];

        for (let i = 0; i < hand.length; i++) {
            let same_suit = [hand[i]];

            for (let j = i + 1; j < hand.length; j++) {
                if (hand[j].suit === hand[i].suit) {
                    same_suit.push(hand[j]);
                }
            }

            same_suit.sort((a, b) => a.rank - b.rank);

            potential_run = [same_suit[0]];
            for (let j = 1; j < same_suit.length; j++) {
                if (same_suit[j].rank === same_suit[j - 1].rank + 1) {
                    potential_run.push(same_suit[j]);
                } else {
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

        runs.flat().forEach(card => {
            hand = hand.filter(handCard => handCard.src !== card.src);
        });

        return { runs, remainingHand: hand };
    };

    const findSets = (hand) => {
        let sets = [];

        for (let i = 0; i < hand.length; i++) {
            let same_rank = [hand[i]];

            for (let j = i + 1; j < hand.length; j++) {
                if (hand[j].rank === hand[i].rank) {
                    same_rank.push(hand[j]);
                }
            }

            if (same_rank.length >= 3) {
                sets.push([...same_rank]);
            }
        }

        sets.flat().forEach(card => {
            hand = hand.filter(handCard => handCard.src !== card.src);
        });

        return { sets, remainingHand: hand };
    };

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

    const user_collection = { user_runs, user_sets, user_deadwood };
    const opponent_collection = { opponent_runs, opponent_sets, opponent_deadwood };

    return { user_collection, opponent_collection };
};

export default getMeldsAndDeadwood;
