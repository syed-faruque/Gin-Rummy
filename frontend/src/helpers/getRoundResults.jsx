const getRoundResults = (laid_off_cards, knocking_deadwood, non_knocking_deadwood) => {
    const non_knocking_remaining_deadwood = non_knocking_deadwood.filter(card => !laid_off_cards.includes(card));
    const non_knocking_remaining_deadwood_total = non_knocking_remaining_deadwood.reduce((total, card) => 
        (card.value === 11 || card.value === 12 || card.value === 13)
        ? total + 10 
        : total + card.value, 0
    );;
    const knocking_deadwood_total = knocking_deadwood.reduce((total, card) => 
        (card.value === 11 || card.value === 12 || card.value === 13)
        ? total + 10 
        : total + card.value, 0
    );
    const point_difference = Math.abs(knocking_deadwood_total-non_knocking_remaining_deadwood_total);
    const knocker_won = (knocking_deadwood_total < non_knocking_remaining_deadwood_total);

    return {knocker_won, point_difference, knocking_deadwood_total, non_knocking_remaining_deadwood_total};
}

export default getRoundResults;
