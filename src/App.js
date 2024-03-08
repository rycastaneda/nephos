import React, { useCallback } from "react";
import "./styles.css";
import { api_url } from "./constants.js";
import Card from "./Card.js";

// 1. Fetch from url in the api_url variable above and store the response in state
// 2. Display the `name`, `number`, and `colors` of each card in a single line, with each field taking up the same amount of space
// 3. Filter out items without a color or with a non-numerical character in the `number`
// 4. Sort alphabetically by name in ascending order
// 5. Filter out all cards that are not Legal in the Penny format
// 6. Create a Card component to display each item within the Cards component
// 7. The `name` element should take up twice the width of the others

const hasNumber = (card) => card.number && Number.isNaN(+card.number);

export default function App() {
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cards) {
          setCards(
            [data.cards
              .filter((card) => card.colors?.length && hasNumber(card))
              // .filter((card) => {
              //   console.log(card.legalities);
              //   return card.legalities.filter(
              //     (legal) =>
              //       legal.legality !== "Legal" && legal.format === "Penny"
              //   );
              // })
              .sort((a, b) => a.name.localeCompare(b.name))]
          );
        }

        setLoading(false);
      });
  }, []);

  const fetchMore = useCallback(async () => {
    if(cards[page]?.length) {
      setPage(page+1)
      return;
    }
    
    setLoading(true);
    const response = await fetch(api_url);
    const data = await response.json();
    if (data.cards) {
      setCards(
        cards.concat([data.cards.filter((card) => card.colors?.length && hasNumber(card))])
      );

      setPage(page + 1)
    }

    setLoading(false);
  }, [cards, page])

  console.log(cards);
  console.log('page', page);

  return (
    <div className="App">
      <header className="dac">
        <h1>MTG Card Finder</h1>
        <input type="text" placeholder="Search" />
      </header>

      <main>
        {!loading && cards.length ? (
          <div className="wrapper">
            {cards[page - 1].map((card) => (
              <Card
                key={card.id}
                {...card}
              />
            ))}
          </div>
        ) : <>Loading</>}
        <div className="dac" style={{ padding: "2rem 0rem" }}>
          <button onClick={() => setPage(page-1)} className={"btn " + (loading || page === 1 ? 'disabled' : '')} disabled={loading || page === 1}>&lt; Previous</button>

          <p>Displaying 1 - 16 if 342 results</p>

          <button className={"btn " + (loading ? 'disabled' : '')} disabled={loading} onClick={fetchMore}>Next &gt;</button>
        </div>
      </main>

    </div>
  );
}
