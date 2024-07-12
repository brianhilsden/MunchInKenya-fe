import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
function App() {
  const [user,setUser] = useState({})
  const [showLogIn,setShowLogin] = useState(true)


  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session",{
      method:"GET"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) { // Assuming the backend sends 'user' data if logged in
          setUser(data);
        }
      
      });
  }, []);


useEffect(() => {
  const sessionCookie = Cookies.get('session'); // Replace 'session' with your cookie name
  if (sessionCookie) {
    console.log("found")
  }
  else{
    console.log("nope");
  }
}, []);
  console.log(user);
  return (
    <>
      <Navbar setUser={setUser} showLogIn={showLogIn} setShowLogin={setShowLogin}/>
      <Outlet context={[user,setUser]}/>  
    </>
  )
  }

export default App;
