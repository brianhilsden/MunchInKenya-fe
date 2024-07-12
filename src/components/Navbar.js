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
              <div>
                <li className="nav-item">
                <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/contactUs">Contact Us</Link>
              </li>
              </div>

              <div>
                <li className="nav-item">
                <Link className="nav-link active p-3 fw-lighter fs-2" aria-current="page" to="/trackOrder">Track Order</Link>
                </li>
              </div>
            
            </ul>
            <form classname="d-flex" onSubmit={handleSubmit}>
        <input classname="form-control" type="text" placeholder="Search For Restaurant" onChange={handleSearch} value={search}/>
        <button className="btn btn-outline-info btn-sm m-2" type="submit">Search</button>

      </form>
      <div classname="">
        <Link to="/signUp">
        {!loggedIn && <button className="btn btn-outline-success btn-sm m-2">Signup</button>}
        </Link>
      {loggedIn && <button className="btn btn-outline-danger btn-sm m-2" onClick={logout}>Log out</button>}
      <img src={"https://t3.ftcdn.net/jpg/00/26/12/44/360_F_26124443_QQVqQWwQGQFqBQg9QACdpktxYQ7xIRkY.jpghttps://t3.ftcdn.net/jpg/00/26/12/44/360_F_26124443_QQVqQWwQGQFqBQg9QACdpktxYQ7xIRkY.jpg"} width="100" height="50" className="d-inline-block align-top" alt=""></img>


      </div>
          </div>
        </div>
      </nav>
        </div>
    );
}

export default Navbar;