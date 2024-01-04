// Leaderboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css"; // Import the CSS file for styling
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    // Fetch leaderboard data from the backend
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/leaderboard${
          selectedCategory ? `?categoryId=${selectedCategory}` : ""
        }`;
        const response = await axios.get(url);
        setLeaderboardData(response.data); // Adjust according to the response structure
      } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
      }
    };
    fetchData();
  }, [selectedCategory]);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">Leaderboard</div>
      <div className="leaderboard-select">
        {/* Dropdown to select category */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* Leaderboard table */}
      <table className="leaderboard-content">
        <thead>
          <tr>
            <th>User</th>
            <th>Correct Answers Count</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(({ _id, correctAnswersCount }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{correctAnswersCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Leaderboard;
