import getUnshuffledCardList from "../helpers/getUnshuffledCardList"
import { useEffect } from "react"

const useInitializeDeck = (socket, updateDeck, updateDeckInitialized) => {

    const unshuffledCardList = getUnshuffledCardList();

    useEffect(() => {
        socket.emit("shuffle-deck")
        socket.on("shuffle-deck", (data) => {
            const shuffled_array = data.shuffled;
            let shuffled_deck = [];
            shuffled_array.forEach(place => {
                shuffled_deck.push(unshuffledCardList[place]);
            });
            updateDeck(shuffled_deck);
            updateDeckInitialized(true);
        })

        return(() => {
            socket.off("shuffle-deck");
        })
    }, [socket]);

}

export default useInitializeDeck;