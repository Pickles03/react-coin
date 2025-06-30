import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetch('https://rest.coincap.io/v3/assets', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const found = data.data.find(c => c.id === id);
        setCoin(found || null);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching coin data: ${error}`);
        setLoading(false);
      });
  }, [id]);
  

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
      setFavorite(false);
    } else {
      favorites.push(id);
      setFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  if (loading) return <p>Loading coin data...</p>;
  if (!coin) return <p>Coin not found.</p>;

  return (
    <div>
      <h2>Info about coin:</h2>
      <h3>{coin.name}</h3>
      <h4>{coin.symbol}</h4>
      <p><strong>Rank:</strong> {coin.rank}</p>
      <p><strong>Price:</strong> ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p><strong>Market Cap:</strong> ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p><strong>Change (24h):</strong> {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>

      <button onClick={toggleFavorite}>
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
}

export default Coin;
