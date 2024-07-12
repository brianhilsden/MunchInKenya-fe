import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const newCart = [...prevCart, item];
            console.log('Updated cart:', newCart); // Log the updated cart state
            return newCart;
        });
    };
    

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };
  return (
    <>
      <Navbar/>
      <Outlet context={[addToCart,removeFromCart,cart]}/>  
    </>
  )
  }

export default App;
