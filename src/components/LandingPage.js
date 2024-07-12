import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function LandingPage() {
  const [data] = useOutletContext() 
    return (
        <div>
           <div className="container p-2 m-4 ">
              <img src= {"https://thumbs.dreamstime.com/b/concept-horizontal-promotional-flyer-poster-restaurant-pizzeria-menu-delicious-taste-pizza-pepperoni-slice-mozzarella-134778484.jpg"} style={{ width: "1820px", height:"550px",objectFit: "cover" }} alt=""/>
              </div> 

              <div className="row bg-light m-3" style={{ height: "60vh" }}>
        <div className="col-md-6">
          <header>
            <h2 className="text-center fst-italic text-secondary fs-1">Welcome To MunchinKenya</h2>
            <h4 className="text-center text-dark fw-lighter fs-2">Know About Us</h4>
          </header>
          <p className="fs-4">
          MunchinKenya at The Villa officially opened its doors in October 2023, a new flagship of The Nairobi casual café concept. Quick and breezy, casual and family-friendly, customers and tiny ones will be equally comfortable in this halal-certified self-service outlet.
          <br>
          </br>
          <h2>
          Managing Director Esther Wee shares:
          </h2>

“It started in 2019 with a small, members-only take away counter at the Academy of Kenyan Entreprenuers, dishing out casual, affordable food bearing the Nairobi trademark quality. The response and support from this little venture was heart-warming, such that we were compelled to look for an opportunity to make MunchinKenya available to the public. And we have finally found it, right under our noses!”    
          </p>

        </div>
        <div className="col-md-6">
        <img src={"https://i.pinimg.com/originals/ef/2c/59/ef2c59764c7f3f59e53e0ba0129c7f87.jpg"} style={{ height: "540px", width: "920px" ,objectFit: "cover"}}  alt=""/>
        </div>
        </div>
              
        <div className="container  p-3 ">

          <h1 className="text-center fst-italic">CHOOSE DESIRED RESTAURANT</h1>
         
        <div className="row">
          {data.map((restaurant) => (
            <div key={restaurant.id} className="col-sm-4 mb-2 mx-auto" id="restaurants">
              <div className="card">
                <Link to={`/restaurantMenu/${restaurant.id}`}>
                <img
                  src={restaurant.image}
                  className="card-img-top"
                  alt="Restaurant"
                  style={{ height: "350px", width: "400px", objectFit: "cover" }}
                />
                </Link>
                {/* <img
                  src={restaurant.image}
                  className="card-img-top"
                  alt="Restaurant"
                  style={{ height: "350px", width: "400px", objectFit: "cover" }}
                /> */}
                <div className="card-body">
                  <h5 className="card-title">Name: {restaurant.name}</h5>
                  <h5 className="card-title">Location: {restaurant.location}</h5>
                </div>
            
             
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    );
}

export default LandingPage;