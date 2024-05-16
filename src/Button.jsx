import React, { useState, useEffect } from "react";

const Button = ({ draw }) => {
  return (
    <div>
      <button onClick={draw}>Gimme A Card!</button>
    </div>
  );
};

export default Button;
