import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Categories</h1>
      <div className="categories-cards">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategorySelect(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
