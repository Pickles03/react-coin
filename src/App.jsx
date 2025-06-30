import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import Coin from './components/Coin';
import Root from './components/Root';


function App () {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Root />}>
                <Route index element={<Home />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/coin/:id' element={<Coin />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
};

export default App;