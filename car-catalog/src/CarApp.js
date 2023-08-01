import React, { useState, useEffect } from "react";

const CarCard = ({ car, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`car-card${showDetails ? " active" : ""}`}>
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
      <div className={`show-details-btn${showDetails ? " active" : ""}`} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </div>
      <button className="delete-btn" onClick={() => onDelete(car.model)}>Delete</button>
    </div>
  );
};

const CarApp = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.npoint.io/6b49fadc38eab9e79911")
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
        setFilteredCars(data.cars);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Filter cars based on brand
    if (brandFilter) {
      const filtered = cars.filter((car) => car.brand === brandFilter);
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [brandFilter, cars]);

  useEffect(() => {
    // Sort cars based on selected criteria
    if (sortBy === "brand_asc") {
      setFilteredCars([...filteredCars].sort((a, b) => a.brand.localeCompare(b.brand)));
    } else if (sortBy === "brand_desc") {
      setFilteredCars([...filteredCars].sort((a, b) => b.brand.localeCompare(a.brand)));
    } else if (sortBy === "price_high") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(b.price.split(" ")[1]) - parseFloat(a.price.split(" ")[1])));
    } else if (sortBy === "price_low") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(a.price.split(" ")[1]) - parseFloat(b.price.split(" ")[1])));
    } else if (sortBy === "speed_high") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(b.maximum_speed.split(" ")[0]) - parseFloat(a.maximum_speed.split(" ")[0])));
    } else if (sortBy === "speed_low") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(a.maximum_speed.split(" ")[0]) - parseFloat(b.maximum_speed.split(" ")[0])));
    }
  }, [sortBy, filteredCars]);

  useEffect(() => {
    // Search functionality
    if (searchTerm) {
      const filtered = cars.filter((car) =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

  const handleDeleteCar = (model) => {
    const updatedCars = cars.filter((car) => car.model !== model);
    setCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  return (
    <div className="car-app">
      <header className="app-header">
        <h1>𝐀𝐛𝐯𝐬𝐬 𝐂𝐚𝐫 𝐂𝐚𝐭𝐚𝐥𝐨𝐠</h1>
      </header>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by brand or model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="">All Brands</option>
          {Array.from(new Set(cars.map((car) => car.brand))).map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="brand_asc">Brand (A-Z)</option>
          <option value="brand_desc">Brand (Z-A)</option>
          <option value="price_high">Price (High to Low)</option>
          <option value="price_low">Price (Low to High)</option>
          <option value="speed_high">Maximum Speed (High to Low)</option>
          <option value="speed_low">Maximum Speed (Low to High)</option>
        </select>
      </div>
      <div className="car-list">
        {filteredCars.map((car) => (
          <CarCard key={car.model} car={car} onDelete={handleDeleteCar} />
        ))}
      </div>
    </div>
  );
};

export default CarApp;
