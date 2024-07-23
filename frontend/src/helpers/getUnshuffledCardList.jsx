/**
 * @author Syed Faruque
 * created: July 5 2024
**/

// imports all the card images, yeah... i know it looks messy
import card1_clubs from '../images/1_of_clubs.png';
import card2_clubs from '../images/2_of_clubs.png';
import card3_clubs from '../images/3_of_clubs.png';
import card4_clubs from '../images/4_of_clubs.png';
import card5_clubs from '../images/5_of_clubs.png';
import card6_clubs from '../images/6_of_clubs.png';
import card7_clubs from '../images/7_of_clubs.png';
import card8_clubs from '../images/8_of_clubs.png';
import card9_clubs from '../images/9_of_clubs.png';
import card10_clubs from '../images/10_of_clubs.png';
import card11_clubs from '../images/11_of_clubs.png';
import card12_clubs from '../images/12_of_clubs.png';
import card13_clubs from '../images/13_of_clubs.png';
import card1_diamonds from '../images/1_of_diamonds.png';
import card2_diamonds from '../images/2_of_diamonds.png';
import card3_diamonds from '../images/3_of_diamonds.png';
import card4_diamonds from '../images/4_of_diamonds.png';
import card5_diamonds from '../images/5_of_diamonds.png';
import card6_diamonds from '../images/6_of_diamonds.png';
import card7_diamonds from '../images/7_of_diamonds.png';
import card8_diamonds from '../images/8_of_diamonds.png';
import card9_diamonds from '../images/9_of_diamonds.png';
import card10_diamonds from '../images/10_of_diamonds.png';
import card11_diamonds from '../images/11_of_diamonds.png';
import card12_diamonds from '../images/12_of_diamonds.png';
import card13_diamonds from '../images/13_of_diamonds.png';
import card1_hearts from '../images/1_of_hearts.png';
import card2_hearts from '../images/2_of_hearts.png';
import card3_hearts from '../images/3_of_hearts.png';
import card4_hearts from '../images/4_of_hearts.png';
import card5_hearts from '../images/5_of_hearts.png';
import card6_hearts from '../images/6_of_hearts.png';
import card7_hearts from '../images/7_of_hearts.png';
import card8_hearts from '../images/8_of_hearts.png';
import card9_hearts from '../images/9_of_hearts.png';
import card10_hearts from '../images/10_of_hearts.png';
import card11_hearts from '../images/11_of_hearts.png';
import card12_hearts from '../images/12_of_hearts.png';
import card13_hearts from '../images/13_of_hearts.png';
import card1_spades from '../images/1_of_spades.png';
import card2_spades from '../images/2_of_spades.png';
import card3_spades from '../images/3_of_spades.png';
import card4_spades from '../images/4_of_spades.png';
import card5_spades from '../images/5_of_spades.png';
import card6_spades from '../images/6_of_spades.png';
import card7_spades from '../images/7_of_spades.png';
import card8_spades from '../images/8_of_spades.png';
import card9_spades from '../images/9_of_spades.png';
import card10_spades from '../images/10_of_spades.png';
import card11_spades from '../images/11_of_spades.png';
import card12_spades from '../images/12_of_spades.png';
import card13_spades from '../images/13_of_spades.png';


// this is essentially what information each card holds. This is an unshuffled list containing all card objects.
const cardList = [
    { src: card1_clubs, value: 1, suit: 'clubs', symbol: '♣1' },
    { src: card2_clubs, value: 2, suit: 'clubs', symbol: '♣2' },
    { src: card3_clubs, value: 3, suit: 'clubs', symbol: '♣3' },
    { src: card4_clubs, value: 4, suit: 'clubs', symbol: '♣4' },
    { src: card5_clubs, value: 5, suit: 'clubs', symbol: '♣5' },
    { src: card6_clubs, value: 6, suit: 'clubs', symbol: '♣6' },
    { src: card7_clubs, value: 7, suit: 'clubs', symbol: '♣7' },
    { src: card8_clubs, value: 8, suit: 'clubs', symbol: '♣8' },
    { src: card9_clubs, value: 9, suit: 'clubs', symbol: '♣9' },
    { src: card10_clubs, value: 10, suit: 'clubs', symbol: '♣10' },
    { src: card11_clubs, value: 11, suit: 'clubs', symbol: '♣J' },
    { src: card12_clubs, value: 12, suit: 'clubs', symbol: '♣Q' },
    { src: card13_clubs, value: 13, suit: 'clubs', symbol: '♣K' },
    { src: card1_diamonds, value: 1, suit: 'diamonds', symbol: '♦1' },
    { src: card2_diamonds, value: 2, suit: 'diamonds', symbol: '♦2' },
    { src: card3_diamonds, value: 3, suit: 'diamonds', symbol: '♦3' },
    { src: card4_diamonds, value: 4, suit: 'diamonds', symbol: '♦4' },
    { src: card5_diamonds, value: 5, suit: 'diamonds', symbol: '♦5' },
    { src: card6_diamonds, value: 6, suit: 'diamonds', symbol: '♦6' },
    { src: card7_diamonds, value: 7, suit: 'diamonds', symbol: '♦7' },
    { src: card8_diamonds, value: 8, suit: 'diamonds', symbol: '♦8' },
    { src: card9_diamonds, value: 9, suit: 'diamonds', symbol: '♦9' },
    { src: card10_diamonds, value: 10, suit: 'diamonds', symbol: '♦10' },
    { src: card11_diamonds, value: 11, suit: 'diamonds', symbol: '♦J' },
    { src: card12_diamonds, value: 12, suit: 'diamonds', symbol: '♦Q' },
    { src: card13_diamonds, value: 13, suit: 'diamonds', symbol: '♦K' },
    { src: card1_hearts, value: 1, suit: 'hearts', symbol: '♥1' },
    { src: card2_hearts, value: 2, suit: 'hearts', symbol: '♥2' },
    { src: card3_hearts, value: 3, suit: 'hearts', symbol: '♥3' },
    { src: card4_hearts, value: 4, suit: 'hearts', symbol: '♥4' },
    { src: card5_hearts, value: 5, suit: 'hearts', symbol: '♥5' },
    { src: card6_hearts, value: 6, suit: 'hearts', symbol: '♥6' },
    { src: card7_hearts, value: 7, suit: 'hearts', symbol: '♥7' },
    { src: card8_hearts, value: 8, suit: 'hearts', symbol: '♥8' },
    { src: card9_hearts, value: 9, suit: 'hearts', symbol: '♥9' },
    { src: card10_hearts, value: 10, suit: 'hearts', symbol: '♥10' },
    { src: card11_hearts, value: 11, suit: 'hearts', symbol: '♥J' },
    { src: card12_hearts, value: 12, suit: 'hearts', symbol: '♥Q' },
    { src: card13_hearts, value: 13, suit: 'hearts', symbol: '♥K' },
    { src: card1_spades, value: 1, suit: 'spades', symbol: '♠1' },
    { src: card2_spades, value: 2, suit: 'spades', symbol: '♠2' },
    { src: card3_spades, value: 3, suit: 'spades', symbol: '♠3' },
    { src: card4_spades, value: 4, suit: 'spades', symbol: '♠4' },
    { src: card5_spades, value: 5, suit: 'spades', symbol: '♠5' },
    { src: card6_spades, value: 6, suit: 'spades', symbol: '♠6' },
    { src: card7_spades, value: 7, suit: 'spades', symbol: '♠7' },
    { src: card8_spades, value: 8, suit: 'spades', symbol: '♠8' },
    { src: card9_spades, value: 9, suit: 'spades', symbol: '♠9' },
    { src: card10_spades, value: 10, suit: 'spades', symbol: '♠10' },
    { src: card11_spades, value: 11, suit: 'spades', symbol: '♠J' },
    { src: card12_spades, value: 12, suit: 'spades', symbol: '♠Q' },
    { src: card13_spades, value: 13, suit: 'spades', symbol: '♠K' }
];

const getUnshuffledCardList = () => {
    return cardList;
}

export default getUnshuffledCardList;
