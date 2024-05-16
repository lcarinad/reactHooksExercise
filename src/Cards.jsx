import React, { useState, useEffect } from "react";
import axios from "axios";

const Cards = () => {
  const [card, setCard] = useState(null);
  let deck_id = "new";
  useEffect(() => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
      .then((res) => {
        deck_id = res.deck_id;
        setCard(res.data.cards[0].image);
      });
  }, []);
  return (
    <div>
      <h1>Cards</h1>
      <div>
        <img src={card} />
      </div>
    </div>
  );
};

export default Cards;
