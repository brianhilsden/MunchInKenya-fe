import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';

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
    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:5555/restaurant")
        .then((res)=>res.json())
        .then((data)=>setData(data))
    },[])
    useEffect(() => {
          const filterList = () => {
            const keywords = search.toLowerCase().split(" ");
            const filteredList = data.filter((restaurant) => {
              return keywords.every((keyword) => {
                return (
                  restaurant.name.toLowerCase().includes(keyword)
                );
              });
            });
            setFilteredList(filteredList);
          };
      
      
          const delaySearch = setTimeout(() => {
            filterList();
          }, 300); 
      
          return () => clearTimeout(delaySearch);
        }, [search, data]); 
      
  return (
    <>
      <Navbar search = {search} setSearch={setSearch}/>
      <Outlet context={[filteredList,addToCart,removeFromCart,cart]}/>  


    </>
  )
  }

export default App;
