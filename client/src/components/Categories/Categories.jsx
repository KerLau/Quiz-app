import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  
  const fetchCategories = async () => {
    try {
      // Replace '/api/categories' with your actual backend endpoint
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle errors as appropriate for your application
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
      {categories.map((category, index) => (
        <div key={index} className="category-card" onClick={() => handleCategorySelect(category.name)}>
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
