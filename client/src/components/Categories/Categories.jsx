// Categories.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    console.log(`Category selected: ${category}`);
    // Implement navigation to the category's quiz page or other actions
  };

  return (
    <div className="categories-container">
      <h1 className="categories-title">Categories</h1>
      <div className="categories-cards">
        {categories.map((category, index) => (
          <div key={index} className="category-card" onClick={() => handleCategorySelect(category.name)}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
