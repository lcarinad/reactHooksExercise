import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "./Button";

const Cards = () => {
  const [card, setCard] = useState(null);
  const [remaining, setRemaining] = useState(52);
  const deckIdRef = useRef(null);

  const API_BASE_URL = "http://deckofcardsapi.com/api/deck";
  //fetch a new shuffled deck when component mounts
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/new/shuffle/?deck_count=1`)
      .then((res) => {
        deckIdRef.current = res.data.deck_id;
        setRemaining(res.data.remaining);
      })
      .catch((err) => console.error("Error fetching the deck:", err));
  }, []);

  const draw = () => {
    if (remaining === 0) {
      alert("error: no cards remaining!");
      return;
    }
    axios
      .get(`${API_BASE_URL}/${deckIdRef.current}/draw/?count=1`)
      .then((res) => {
        if (res.data.success) {
          setCard(res.data.cards[0].image);
          setRemaining(res.data.remaining);
        }
      })
      .catch((err) => console.error("Error drawing a card:", err));
  };
  return (
    <div>
      <Button draw={draw} />
      <h1>Cards</h1>
      {/* we only render card if card is not null */}
      <div>{card && <img src={card} alt="card" />}</div>
    </div>
  );
};

export default Cards;
