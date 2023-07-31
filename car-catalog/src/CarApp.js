// CarApp.js
import React, { useState, useEffect } from "react";

const CarApp = () => {
  return (
    <div className="car-app">
      {}
    </div>
  );
};

export default CarApp;


import React, { useState, useEffect } from "react";

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.img_url} alt={car.model} />
      <h3>{car.brand} - {car.model}</h3>
    </div>
  );
};

const CarApp = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    
    fetch("https://api.npoint.io/6b49fadc38eab9e79911")
      .then((response) => response.json())
      .then((data) => setCars(data.cars))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="car-app">
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car.model} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarApp;

// CarApp.js
import React, { useState, useEffect } from "react";

const CarCard = ({ car }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`car-card${showDetails ? " active" : ""}`} onClick={() => setShowDetails(!showDetails)}>
      <img src={car.img_url} alt={car.model} />
      <h3>{car.brand} - {car.model}</h3>
      {showDetails && (
        <div className="details">
          <p>Type: {car.type}</p>
          <p>Price: {car.price}</p>
          <p>Engine Type: {car.engine_type}</p>
          <p>Acceleration: {car.acceleration}</p>
          <p>Maximum Speed: {car.maximum_speed}</p>
          <p>Release Date: {car.release_date}</p>
        </div>
      )}
      <div className={`show-details-btn${showDetails ? " active" : ""}`}>{showDetails ? "Hide Details" : "Show Details"}</div>
    </div>
  );
};

const CarApp = () => {
  
};

export default CarApp;

// CarApp.js
import React, { useState, useEffect } from "react";

const CarCard = ({ car }) => {
  // Same as before
};

const CarApp = () => {
  const [brandFilter, setBrandFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
   
  }, []);

  useEffect(() => {
    
    if (brandFilter) {
      const filtered = cars.filter((car) => car.brand === brandFilter);
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [brandFilter, cars]);

  return (
    <div className="car-app">
      <div className="filter-section">
        {}
      </div>
      <div className="car-list">
        {filteredCars.map((car) => (
          <CarCard key={car.model} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarApp;



