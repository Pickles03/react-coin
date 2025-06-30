import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home () {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            setCoins(data.data);
            setLoading(false);
        })
        .catch(error => {
            console.error(`Error fetching data, ${error}`);
            setLoading(false);
        })
    }, []);

    if (loading) return <p>Loading coins...</p>

    return (
        <div>
            <h2>Crypto currencies:</h2>
            <ul>
                {coins.map((coin) => (
                    <li key={coin.id}>
                        <Link to={`/coin/${coin.id}`}>
                            {coin.rank}. {coin.name} ({coin.symbol}) - ${parseFloat(coin.priceUsd).toFixed(2)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;