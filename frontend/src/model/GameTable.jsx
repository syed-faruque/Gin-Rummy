import {useEffect, useState} from "react";
import useAnimationToHandStartingPoint from "../hooks/useAnimationToHandStartingPoint";
import useAnimationToPileStartingPoint from "../hooks/useAnimationToPileStartingPoint";
import Deck from "../components/Deck";
import Hands from "../components/Hands";
import Pile from "../components/Pile";
import PassButton from "../components/PassButton";
import useWindowSize from "../hooks/useWindowSize";
import Message from "../components/Message";

const GameTable = ({socket, player}) => {

    const [deck, setDeck] = useState([]);
    const [pile, setPile] = useState([]);
    const [hands, setHands] = useState({user_hand: [], opponent_hand: []});
    const [deckInitialized, setDeckInitialized] = useState(false);
    const [pileInitialized, setPileInitialized] = useState(false);
    const [handsInitialized, setHandsInitialized] = useState(false);
    const [animationToHandStartingPoint, updateAnimationToHandStartingPoint] = useAnimationToHandStartingPoint(deck);
    const [animationToPileStartingPoint, updateAnimationToPileStartingPoint] = useAnimationToPileStartingPoint(deck);
    const [animationFromHand, setAnimationFromHand] = useState({active: false, card_index: null, previous_hand_length: null, user: false});
    const [turn, setTurn] = useState(player == 1);
    const [stage, setStage] = useState(0);
    const [last, setLast] = useState({});
    const windowSize = useWindowSize();

    const updateDeck = (newDeck) => {
        setDeck(newDeck);
    }

    const updatePile = (newPile) => {
        setPile(newPile);
    }

    const updateHands = (newHands) => {
        setHands(newHands);
    }

    const updateDeckInitialized = (bool) => {
        setDeckInitialized(bool);
    }

    const updatePileInitialized = (bool) => {
        setPileInitialized(bool);
    }

    const updateHandsInitialized = (bool) => {
        setHandsInitialized(bool);
    }

    const updateTurn = () => {
        setTurn(!turn);
    }

    const updateStage = (newStage) => {
        setStage(newStage);
    }

    const updateLast = (newLast) => {
        setLast(newLast);
    }

    const updateAnimationFromHand = (newAnimationFromHand) => {
        setAnimationFromHand(newAnimationFromHand);
    }

    const props = {
        socket, player,
        deck, updateDeck,
        pile, updatePile,
        hands, updateHands,
        deckInitialized, updateDeckInitialized,
        pileInitialized, updatePileInitialized,
        handsInitialized, updateHandsInitialized,
        animationToHandStartingPoint, updateAnimationToHandStartingPoint,
        animationToPileStartingPoint, updateAnimationToPileStartingPoint,
        animationFromHand, updateAnimationFromHand,
        turn, updateTurn,
        stage, updateStage,
        last, updateLast,
        windowSize
    }

    useEffect(() => {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.height = "100%";
        document.body.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.documentElement.style.width = "100%";
        document.body.style.backgroundColor = "#006400";
      }, []);

    return(
        <main>
            <Deck {...props}/>
            <Hands {...props}/>
            <Pile {...props}/>
            <PassButton {...props} />
            <Message {...props} />
        </main>
    )

}

export default GameTable;