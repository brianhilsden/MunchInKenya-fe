
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';

function App() {

    const [search, setSearch] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    const [data, setData] = useState([]);
    const [user,setUser] = useState()
    const [loggedIn,setIsLoggedIn] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('http://127.0.0.1:5555/check_session', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to verify token');
          }
          return response.json(); // Parse JSON response
        })
        .then(userData => {
          setIsLoggedIn(true);
          setUser(userData); // Set user data once fetched
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          setIsLoggedIn(false);
          setUser(null); // Reset user state if verification fails
          localStorage.removeItem('access_token');
        });
      }
    }, []);

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
      <Navbar search = {search} setSearch={setSearch} setUser={setUser} loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Outlet context={[filteredList,user,setUser,setIsLoggedIn]}/>  


    </>
  )
  }

export default App;
