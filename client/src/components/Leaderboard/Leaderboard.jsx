// Leaderboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch leaderboard data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/leaderboard");
        setLeaderboardData(response.data.categories);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Assume this function is called when a user attempts a question
  const handleQuizAttempt = async (user, category, isCorrect) => {
    try {
      // Fetch the current leaderboard data
      const response = await axios.get("http://localhost:3000/leaderboard");
      const updatedLeaderboardData = { ...response.data.categories };

      // Update the user's data
      if (!updatedLeaderboardData[category][user]) {
        updatedLeaderboardData[category][user] = {
          attempts: 0,
          correctAnswers: 0,
        };
      }

      updatedLeaderboardData[category][user].attempts += 1;
      if (isCorrect) {
        updatedLeaderboardData[category][user].correctAnswers += 1;
      }

      // Send the updated data to the backend
      await axios.post("http://localhost:3000/updateLeaderboard", {
        categories: updatedLeaderboardData,
      });

      // Refresh the leaderboard display
      setLeaderboardData(updatedLeaderboardData);
    } catch (error) {
      console.error("Error updating leaderboard data:", error.message);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="leaderboard-container">
      {/* Dropdown to select category */}
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {Object.keys(leaderboardData).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Leaderboard table */}
      <table className="leaderboard-content">
        <thead>
          <tr>
            <th>User</th>
            <th>Attempts</th>
            <th>Correct Answers</th>
          </tr>
        </thead>
        <tbody>
          {selectedCategory
            ? Object.entries(leaderboardData[selectedCategory]).map(
                ([user, userData]) => (
                  <tr key={user} className="leaderboard-entry">
                    <td>{user}</td>
                    <td>{userData}</td>
                    <td>{userData.correctAnswers}</td>
                  </tr>
                )
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
