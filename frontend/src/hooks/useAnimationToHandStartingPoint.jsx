/**
 * @author Syed Faruque
 * created: July 7 2024
**/

import { useState } from "react";
import getDeckPosition from "../helpers/getDeckPosition";
import useWindowSize from "./useWindowSize";

// the starting position of a card animating to the hand should change based on whether it was pulled from the deck or pile.
// this coordinates and passes on the state of the initial position of a animation to the hand.

const useAnimationToHandStartingPoint = (deck) => {

    const windowSize = useWindowSize();
    const [animationToHandStartingPoint, setAnimationToHandStartingPoint] = useState(getDeckPosition(deck.length-1, windowSize));

    const updateAnimationToHandStartingPoint = (newStartingPoint) => {
        setAnimationToHandStartingPoint(newStartingPoint);
    }

    return [animationToHandStartingPoint, updateAnimationToHandStartingPoint];

}

export default useAnimationToHandStartingPoint;
