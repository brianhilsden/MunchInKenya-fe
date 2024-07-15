import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import './LandingPage.css'; // Import the CSS file

function LandingPage() {
  const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();

  if (user){
    
  }
  return (
    <div>
      <div className="container-fluid m-1  ">
        <img
          src={"https://thumbs.dreamstime.com/b/concept-horizontal-promotional-flyer-poster-restaurant-pizzeria-menu-delicious-taste-pizza-pepperoni-slice-mozzarella-134778484.jpg"}
          className="landing-img"
          style={{ width: "100%", height: "550px", objectFit: "cover" }}
          alt=""
        />
      </div>

      <div className="row bg-light m-3" >
        <div className="col-md-6">
          <header>
            <h2 className="text-center fst-italic text-secondary fs-1">Welcome To MunchinKenya</h2>
            <h4 className="text-center text-dark fw-lighter fs-2">Know About Us</h4>
          </header>
          <p className="fs-4">
            MunchinKenya at The Villa officially opened its doors in October 2023, a new flagship of The Nairobi casual café concept. Quick and breezy, casual and family-friendly, customers and tiny ones will be equally comfortable in this halal-certified self-service outlet.
            <br />
            <h2>Managing Director Esther Wee shares:</h2>
            “It started in 2019 with a small, members-only takeaway counter at the Academy of Kenyan Entrepreneurs, dishing out casual, affordable food bearing the Nairobi trademark quality. The response and support from this little venture was heart-warming, such that we were compelled to look for an opportunity to make MunchinKenya available to the public. And we have finally found it, right under our noses!”
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={"https://i.pinimg.com/originals/ef/2c/59/ef2c59764c7f3f59e53e0ba0129c7f87.jpg"}
            className="about-img"
            style={{ height: "540px", width: "920px", objectFit: "cover" }}
            alt=""
          />
        </div>
      </div>

      <div className="container p-3 card-container">
        <h1 className="text-center fst-italic">CHOOSE DESIRED RESTAURANT</h1>
        <div className="row">
          {filteredList.map((restaurant) => (
            <div key={restaurant.id} className="col-sm-4 mb-2 mx-auto restaurant-card" id="restaurants">
              <div className="card">
                <Link to={`/MunchInKenya-fe/restaurantMenu/${restaurant.id}`}>
                  <img
                    src={restaurant.image}
                    className="card-img-top"
                    alt="Restaurant"
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">Name: {restaurant.name}</h5>
                  <h5 className="card-title">Location: {restaurant.location}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row bg-light m-2 contact-section">
        <div className="col-md-6">
          <header>
            <h3 className="text-dark fw-lighter fs-2">Call Us</h3>
          </header>
          <a className="text-white" href="tel:0705237806">
            <span className="text-dark">020-123-789</span>
          </a>
          <header>
            <h3 className="text-dark fw-lighter fs-2">Email Us</h3>
          </header>
          <a href="mailto:vikakamau04@gmail.com" className="text-white">
            <span className="text-dark">MunchinKenya@gmail.com</span>
          </a>
          <header>
            <h3 className="text-dark fw-lighter fs-2">Reach Us Through</h3>
          </header>
          <div className="d-flex gap-3">
            <img
              src="https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg"
              style={{ width: "50px", height: "40px", objectFit: "cover" }}
              alt="Instagram"
            />
            <img
              src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
              style={{ width: "50px", height: "40px", objectFit: "cover" }}
              alt="Twitter"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
              style={{ width: "50px", height: "40px", objectFit: "cover" }}
              alt="Facebook"
            />
          </div>
        </div>
        <div className="col-md-6 text-right business-hours">
          <header>
            <h3 className="text-dark fw-lighter fs-2">Business Hours</h3>
          </header>
          <h5 className="text-dark fw-lighter fs-5">Monday-Friday: 6:30am to 11:30pm</h5>
          <h5 className="text-dark fw-lighter fs-5">Saturday: 7:00am to 9:00pm</h5>
          <h5 className="text-dark fw-lighter fs-5">Sunday: 10:00am to 7:00pm</h5>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
