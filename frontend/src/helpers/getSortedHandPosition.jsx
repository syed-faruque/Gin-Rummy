const getSortedHandPosition = (index, user, collection, windowSize) => {

    function findNumberMeldsToLeftOfIndex(array2D, flatIndex) {
        let currentIndex = 0;
        for (let i = 0; i < array2D.length; i++) {
            const subArrayLength = array2D[i].length;
            if (flatIndex >= currentIndex && flatIndex < currentIndex + subArrayLength) {
                return i;
            }
            currentIndex += subArrayLength;
        }
      }

    const overlapProportion = .5;
    const cardWidth = 70;
    const cardHeight = 100;
    const windowHeight = windowSize.height;
    const windowWidth = windowSize.width;
    const melds = collection.melds || [];
    const deadwood = collection.deadwood || [];
    const num_melds = melds.length;
    const combined = melds.concat([deadwood]);
    const num_groups = combined.length;
    const combined_flat = combined.flat();
    const num_cards = combined_flat.length;
    const gap = .5 * cardWidth;
    const hangOver = .5*cardWidth;
    const num_melds_to_left = findNumberMeldsToLeftOfIndex(combined, index);

    const horizontalShift = (index * cardWidth * overlapProportion) + (num_melds_to_left * (hangOver + gap))
    
    const lengthStack = (overlapProportion * num_cards * cardWidth) + (num_groups * hangOver) + (num_melds * gap);
    const initialLeftMargin = .5 * (windowWidth - lengthStack);
    const leftMargin = initialLeftMargin + horizontalShift;
    
    let position;
    if (user) {
        position = {
            top: `${windowHeight - cardHeight - windowHeight/6}px`,
            left: `${leftMargin}px`
        }
    }
    else  {
        position = {
            top: `${windowHeight/6}px`,
            left: `${leftMargin}px`
        }
    }
    return position;

}   

export default getSortedHandPosition;
