import React from "react";

function Card({ name, set, power, cmc, colors, rarity }) {
  return (
    <div className="card">
      <div className="dac">
        <div>
          <h1>{name}</h1>
          <span>{set}</span>
        </div>
        <p className="">{power}/{cmc}</p>
      </div>
      <hr />
      <div className="dac">
        <div className={"badge " + rarity.toLowerCase()}>{rarity}</div>
        <ul className="flex">
        {colors.map(color => <li key={color} className={"color " + color.toLowerCase()}></li> )}
        </ul>
      </div>
    </div>
  );
}

export default Card;
