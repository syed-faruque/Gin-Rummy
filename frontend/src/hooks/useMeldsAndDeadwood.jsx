/**
 * @author Syed Faruque
 * created: July 15 2024
**/

import { useEffect, useState } from "react";

const useMeldsAndDeadwood = (hands) => {
    let user_hand = [...hands.user_hand];
    let opponent_hand = [...hands.opponent_hand];

    const [meldsAndDeadwood, setMeldsAndDeadwood] = useState({});

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
                // once the list is confirmed a run, the hand list is filtered of those cards in the run
                        potential_run.forEach(card => {
                            hand = hand.filter(handCard => handCard.src !== card.src);
                        });
                    }
                    potential_run = [same_suit[j]];
                }
            }

            if (potential_run.length >= 3) {
                runs.push([...potential_run]);
        // once the list is confirmed a run, the hand list is filtered of those cards in the run
                potential_run.forEach(card => {
                    hand = hand.filter(handCard => handCard.src !== card.src);
                });
            }
        }

        return runs;
    };

    const findSets = (hand) => {
        let sets = [];
        let i = 0;
    
        while (i < hand.length - 1) {
            let same_value = [hand[i]];
    
    // finds all cards with the same value as card at current index and stores it
            for (let j = i + 1; j < hand.length; j++) {
                if (hand[j].value === hand[i].value) {
                    same_value.push(hand[j]);
                }
            }
    
        // if that list of cards with same value is >= 3, it qualifies as a set
            if (same_value.length >= 3) {
                sets.push([...same_value]);
    
            // once the list of same value cards is confirmed a set, those cards are filtered out from the hand
                hand = hand.filter(handCard => !same_value.some(card => card.src === handCard.src));
    
            // reset i to 0 to ensure every other card is checked again after removal
                i = 0;
            } 
            else {
        // move to the next card if no set is found
                i++;
            }
        }
    
        return sets;
    };

// helps sort out overlap between melds to produce lowest possible deadwood. Returns deadwood and finalized melds.
    const processMeldsAndDeadwood = (hand, findRuns, findSets) => {
        const runs = findRuns(hand) || [];
        const sets = findSets(hand) || [];
        let set_srcs = [];
        let run_srcs = [];
    
        for (let i = 0; i < sets.length; i++) {
            for (let j = 0; j < runs.length; j++) {
                set_srcs = sets[i].map(card => card.src);
                run_srcs = runs[j].map(card => card.src);
                const overlaps = set_srcs.filter(card_src => run_srcs.includes(card_src));
                for (const overlap of overlaps) {
                    const setIndex = set_srcs.indexOf(overlap);
                    const runIndex = run_srcs.indexOf(overlap);
    
                    if (setIndex !== -1 && runIndex !== -1) {
                        const setTotal = sets[i].reduce((sum, card) => sum + card.value, 0);
                        const runTotal = runs[j].reduce((sum, card) => sum + card.value, 0);

                    // checks if the run that had the overlap totals higher than the set
                        if (runTotal > setTotal) {

                        // if the run is just 3, than it might make sense to give it preference given it totals more
                            if (runs[j].length == 3) {
                                sets[i].splice(setIndex, 1);
                                if (sets[i].length < 3) {
                                    sets.splice(i, 1);
                                }
                            }
                        // if the run is more than 3, regardless of whether it gets the overlapped card, it will still be a meld. So the set gets preference.
                            else {
                                runs[j].splice(runIndex, 1);
                                if (runs[j].length < 3) {
                                    runs.splice(j, 1);
                                }
                            }
                        }
                    
                    // if the run doesn't total more than the set, it makes no sense to give the run more preference, unless the set is already more than 3
                        else {
                            if (sets[i].length > 3) {
                                sets[i].splice(setIndex, 1);
                                if (sets[i].length < 3) {
                                    sets.splice(i, 1);
                                }
                            }
                            else {
                                runs[j].splice(runIndex, 1);
                                if (runs[j].length < 3) {
                                    runs.splice(j, 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    
        let allSrcs = [];
        sets.forEach(set => {
            allSrcs = allSrcs.concat(set.map(card => card.src));
        });
        runs.forEach(run => {
            allSrcs = allSrcs.concat(run.map(card => card.src));
        });
        allSrcs = [...new Set(allSrcs)];
        const deadwood = hand.filter(handCard => !allSrcs.includes(handCard.src));
    
        return { runs, sets, deadwood };
    };
    

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updates and returns state ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    useEffect(() => {
        const { runs: user_runs, sets: user_sets, deadwood: user_deadwood } = processMeldsAndDeadwood(user_hand, findRuns, findSets);
        const { runs: opponent_runs, sets: opponent_sets, deadwood: opponent_deadwood } = processMeldsAndDeadwood(opponent_hand, findRuns, findSets);

        setMeldsAndDeadwood({
            user_collection: { user_runs, user_sets, user_deadwood },
            opponent_collection: { opponent_runs, opponent_sets, opponent_deadwood }
        });
    }, [hands]);

    return meldsAndDeadwood;
};

export default useMeldsAndDeadwood;
