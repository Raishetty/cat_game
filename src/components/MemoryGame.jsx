import React,{useState, useRef} from "react";
import "../styles/MemoryGame.css";

function shuffle(array){
    let currentIndex =array.length,
    randomindex;
    while (currentIndex > 0){
        randomindex = Math.floor(Math.random()*currentIndex) // 0-1 where 1 is excluded
        currentIndex --;
        [array[currentIndex],array[randomindex]]=
        [array[randomindex],
        array[currentIndex],
    ];
    }
    return array;

}

const items = [1,2,3,4,5];
const allItem = shuffle([...items, ...items]);
const defaultState = { index: null, value: null };


export default function MemoryGame() {
    const [moves, setMoves] = useState(0);
    const [firstCard , setFirstCard] = useState(defaultState);
    const [secondCard, setSecondCard] = useState(defaultState);
    const [remainingCards, setRemainingCards] = useState(items);
  

    const timer = useRef();

    const handleClick = (index, value) => {
      clearTimeout(timer.current);
  
      // If the same card is clicked again, reset it
      if (firstCard.index === index) {
        setFirstCard(defaultState);
        setMoves(moves + 1);
        return; // Exit the function early, as the card was flipped back
      }
  
      if (firstCard.index === null || secondCard.index !== null) {
        // Set the clicked card as the first card
        setFirstCard({ index, value });
        setSecondCard(defaultState);
        setMoves(moves + 1);
      } else {
        // Set the clicked card as the second card
        setSecondCard({ index, value });
        setMoves(moves + 1);
  
        if (firstCard.value === value) {
          // If cards match, remove them from remaining cards
          setRemainingCards(remainingCards.filter((card) => card !== value));
        }
      }
  
      // Set a timeout to flip back cards after 1 second
      timer.current = setTimeout(() => {
        setFirstCard(defaultState);
        setSecondCard(defaultState);
      }, 1000);
    };

return (
   <> {remainingCards.length > 0 ? `Remaining cards: ` : "Victory!"}
        {remainingCards.map((card, index) => {
             return  (
                <img
                  key={index}
                  alt= {`cat ${index}`}
                  src={`https://robohash.org/${card}?set=set4&&size=80x80`}
                />
              );
            })}
            <div className="cardsContainer">
            {
              allItem.map((item, index) => {
                return (
                  <div                   
                    key = {index}
                    className={`card ${
                      (firstCard.index === index ||
                        secondCard.index === index ||
                        !remainingCards.includes(item)) &&
                      "flipped"
                    }`}
                    
                    onClick={() => handleClick(index, item)}
                    >
                    <div className="backSide"></div>
                    <img 
                    alt = {`cat ${index}`}
                    src = {`https://robohash.org/${item}?set=set4&&size=120x120`}
                    />
                    </div>                    
                    );              
              })}
              </div>
              Moves used: {moves}
</>
);
}
