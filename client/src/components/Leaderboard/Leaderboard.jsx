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
        const response = await axios.get("categories");
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
        const url = `leaderboard${
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
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="leaderboard-content">
        <div className="leaderboard-thead">
          <div className="leaderboard-th">User</div>
          <div className="leaderboard-th">Scores</div>
        </div>
        <div className="leaderboard-tbody">
          {leaderboardData.map(({ _id, correctAnswersCount }) => (
            <div className="leaderboard-tr" key={_id}>
              <div className="leaderboard-td">{_id}</div>
              <div className="leaderboard-td">{correctAnswersCount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
