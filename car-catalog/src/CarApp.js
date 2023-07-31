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

