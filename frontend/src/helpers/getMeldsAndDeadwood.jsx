const getMeldsAndDeadwood = (hands) => {
    const user_hand = [...hands.user_hand];
    const opponent_hand = [...hands.opponent_hand];

    const find_runs = (hand) => {
        let runs = [];
        for (let i = 0; i < hand.length - 1; i++) {
            let same_suit = [hand[i]];

            for (let z = i + 1; z < hand.length; z++) {
                if (hand[z].suit === hand[i].suit) {
                    same_suit.push(hand[z]);
                }
            }

            same_suit.sort((a, b) => a.rank - b.rank);

            let potential_run = [same_suit[0]];
            for (let z = 1; z < same_suit.length; z++) {
                if (same_suit[z].rank === same_suit[z - 1].rank + 1) {
                    potential_run.push(same_suit[z]);
                } 
                else {
                    if (potential_run.length >= 3) {
                        runs.push(potential_run);
                    }
                    potential_run = [same_suit[z]];
                }
            }

            if (potential_run.length >= 3) {
                runs.push(potential_run);
            }
        }

        return runs;
    }

    const findSets = (remaining_hand) => {
        
    }
}

export default getMeldsAndDeadwood;
