/**
 * @author Syed Faruque
 * created: July 7 2024
**/

import { useState } from "react";
import getDeckPosition from "../helpers/getDeckPosition";
import useWindowSize from "./useWindowSize";

const useAnimationToPileStartingPoint = (deck) => {

    const windowSize = useWindowSize();
    const [animationToPileStartingPoint, setAnimationToPileStartingPoint] = useState(getDeckPosition(deck.length-1, windowSize));

    const updateAnimationToPileStartingPoint = (newStartingPoint) => {
        setAnimationToPileStartingPoint(newStartingPoint);
    }

    return [animationToPileStartingPoint, updateAnimationToPileStartingPoint];

}

export default useAnimationToPileStartingPoint;
