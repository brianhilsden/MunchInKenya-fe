import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";

// LandingPage component
function LandingPage() {
  const [
    data,
    filteredList,
    addToCart,
    removeFromCart,
    cart,
    user,
    setUser,
    setIsLoggedIn,
  ] = useOutletContext();
  const navigate = useNavigate()

  return (
    <div className="bg-background md:p-2">
      {/* Landing Image */}
      <div className="relative">
        <motion.img
          src={
            "https://tb-static.uber.com/prod/image-proc/processed_images/abc6aaac20ef1731893b875904a7710e/16bb0a3ab8ea98cfe8906135767f7bf4.webp"
          }
          className="w-full md:h-[550px] object-cover brightness-90"
          alt="Landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row bg-surface sm:p-4 rounded-lg shadow-lg">
        <div className="lg:w-1/2 p-4">
          <motion.header
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-center text-3xl font-semibold text-secondary">
              Welcome To MunchinKenya
            </h2>
            <h4 className="text-center text-lg text-gray-700 mt-2">
              Know About Us
            </h4>
          </motion.header>
          <p className="text-lg mt-4 text-gray-600">
            MunchinKenya at The Villa officially opened its doors in October
            2023, a new flagship of The Nairobi casual café concept. Quick and
            breezy, casual and family-friendly, customers and tiny ones will be
            equally comfortable in this halal-certified self-service outlet.
            Managing Director Esther Wee shares: “It started in 2019 with a
            small, members-only takeaway counter at the Academy of Kenyan
            Entrepreneurs, dishing out casual, affordable food bearing the
            Nairobi trademark quality. The response and support from this little
            venture was heart-warming, such that we were compelled to look for
            an opportunity to make MunchinKenya available to the public. And we
            have finally found it, right under our noses!”
          </p>
        </div>
        <div className="lg:w-1/2 p-4">
          <motion.img
            src={
              "https://i.pinimg.com/originals/ef/2c/59/ef2c59764c7f3f59e53e0ba0129c7f87.jpg"
            }
            className="h-[540px] w-full object-cover rounded-lg shadow-lg"
            alt="About Us"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Choose Restaurant Section */}
      <div className=" mx-auto p-4 w-full">
        <h1 className="text-center text-3xl font-semibold text-secondary mb-6">
          CHOOSE DESIRED RESTAURANT
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  w-full">
          {filteredList.map((restaurant) => (
            
            <motion.div
              key={restaurant.id}
              id="restaurants"
              className="w-full mb-4 cursor-pointer"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1,type:"spring",stiffness:"100" }}
              onClick={()=>navigate(`/MunchInKenya-fe/restaurantMenu/${restaurant.id}`)}
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="p-4">
                  {/* Restaurant Image */}
                  {restaurant.image && (
                    <img
                      src={restaurant.image}
                      className="w-full h-[200px] object-cover rounded-lg mb-4"
                      alt={restaurant.name}
                    />
                  )}
                  <h5 className="text-lg font-semibold text-blue-800">
                    Name: {restaurant.name}
                  </h5>
                  <p className="text-sm text-textSecondary">
                    Location: {restaurant.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

   

    </div>
  );
}

export default LandingPage;
