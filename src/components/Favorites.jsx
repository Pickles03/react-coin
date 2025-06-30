import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter(coin => favorites.includes(coin.id));
        setCoins(filtered);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading favorites:", error);
        setLoading(false);
      });
  }, [favorites]);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div>
      <h1>Favorite Cryptocurrencies</h1>
      {coins.length === 0 ? (
        <p>No favorite cryptocurrencies yet.</p>
      ) : (
        <ul>
          {coins.map(coin => (
            <li key={coin.id}>
              <Link to={`/coin/${coin.id}`}>
                {coin.name} ({coin.symbol}) - ${parseFloat(coin.priceUsd).toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
