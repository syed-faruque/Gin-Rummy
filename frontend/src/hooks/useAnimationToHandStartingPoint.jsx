import { useState } from "react";
import getDeckPosition from "../helpers/getDeckPosition";
import useWindowSize from "./useWindowSize";

const useAnimationToHandStartingPoint = (deck) => {

    const windowSize = useWindowSize();
    const [animationToHandStartingPoint, setAnimationToHandStartingPoint] = useState(getDeckPosition(deck.length-1, windowSize));

    const updateAnimationToHandStartingPoint = (newStartingPoint) => {
        setAnimationToHandStartingPoint(newStartingPoint);
    }

    return [animationToHandStartingPoint, updateAnimationToHandStartingPoint];

}

export default useAnimationToHandStartingPoint;