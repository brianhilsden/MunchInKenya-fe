import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({search, setSearch,setUser,loggedIn,setIsLoggedIn}) {
    const navigate = useNavigate()
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
      };
      function handleSubmit(e) {
        e.preventDefault();
        const restaurantElement = document.querySelector("#restaurants");
        if (restaurantElement) {
          setTimeout(() => {
            restaurantElement.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          console.error("Element with ID 'packages' not found.");
        }
      }
      const logout = () =>{
        localStorage.removeItem("access_token");
        setIsLoggedIn(false)
        setUser(null)
        navigate('/')
      }

    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
            
          <img src={"https://i.pinimg.com/originals/ee/ec/17/eeec174a1c8a3bea023f3ce2fce90597.jpg"} width="120" height="100" className="d-inline-block align-top" alt=""></img>
            <h3 className="p-3 fw-lighter fs-2">MunchinKenya</h3>
          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto">
              <div>
                <li className="nav-item " >
                    <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/">Home</Link>
                </li>
              </div>
              <div>
                {!loggedIn && <li className="nav-item ">
                <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/login">Login</Link>
                </li>}
              </div>
              {/* <div>
                <li className="nav-item">
                <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/contactUs">Contact Us</Link>
              </li>
              </div> */}
              <div>
              <li class="nav-item dropdown">
          <li class="nav-link dropdown-toggle p-3 fw-lighter fs-2"   role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Contacts
          </li>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item  p-1 fw-lighter fs-4" aria-current="page" to="/contactUs">Contact Us</Link>
          <Link className="dropdown-item  p-1 fw-lighter fs-4" aria-current="page" to="/feedbackForm">Feedback</Link>
          </ul>
        </li>
              </div>

              <div>
                <li className="nav-item">
                <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/trackOrder">Order</Link>
                </li>
              </div>
            
            </ul>

            <form classname="d-flex ">
        <input classname="form-control m-2" type="text" placeholder="Search For Restaurant" onChange={handleSearch} value={search}/>
      </form>
      <form classname="d-flex " onSubmit={handleSubmit}>
      <button className="btn btn-outline-info btn-sm m-3" type="submit" >Search</button>

      </form>

      <div classname="">
        <Link to="/signUp">
        {!loggedIn && <button className="btn btn-outline-success btn-sm m-3">Signup</button>}
        </Link>

      {loggedIn && <button className="btn btn-outline-danger btn-sm m-3" onClick={logout}>Log out</button>}
      

     
      <Link to="/cart">
      <img src={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/shopping_cart.png"} width="50" height="50" className="d-inline-block align-top m-2 " alt=""></img>
      </Link>



      </div>
          </div>
        </div>
      </nav>
      
        </div>
        
    );
}

export default Navbar;
