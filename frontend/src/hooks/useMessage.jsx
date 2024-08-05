import { useState, useEffect } from 'react';

const useMessage = (stage, turn, pileInitialized, userKnocked, opponentKnocked) => {
    const [message, setMessage] = useState();
    const updateMessage = (newMessage) => {
        setMessage(newMessage);
    }

    useEffect(() => {
        if (!pileInitialized) return;

        else if (userKnocked && stage == 3) {
            setMessage("Knocked !! Performing lay off with opponent hand")
        }
        else if (opponentKnocked && stage == 3) {
            setMessage("Opponent knocked !! Performing lay off")
        }
        else if (turn && stage == 0) {
            setMessage("You may draw from the pile or pass the turn ...");
        }
        else if (turn && stage == 1) {
            setMessage("You may draw from the pile or choose from the deck ...");
        }
        else if (turn && stage == 2) {
            setMessage("Remove a card from your hand (or knock if you can)...");
        }
        else if (stage == 0) {
            setMessage("Waiting for opponent to pass or draw first card ...");
        }
        else if (stage == 1) {
            setMessage("Waiting for opponent to draw from deck or pile ...");
        }
        else if (stage == 2){
            setMessage("Waiting for opponent to remove a card ...");
        }
    }, [stage, turn, pileInitialized])

    return [message, updateMessage];
}

export default useMessage;
