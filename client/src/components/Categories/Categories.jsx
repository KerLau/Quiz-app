
import React, { useState, useEffect } from 'react';
import './Categories.css'; 

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories'); // Replace '/api/categories' with your actual backend endpoint
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      
      // Handle errors as appropriate for your application
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to handle category selection (to be implemented)
  const handleCategorySelect = (category) => {
    console.log(`Category selected: ${category}`);
    // Here you could navigate to the category's quiz page or perform other actions
  };

  return (
    <div className="categories-container">
      <div className="categories-column">
        {categories.slice(0, 5).map((category, index) => (
          <div key={index} className="category-card" onClick={() => handleCategorySelect(category.name)}>
            {category.name}
          </div>
        ))}
      </div>
      <div className="categories-column">
        {categories.slice(5).map((category, index) => (
          <div key={index} className="category-card" onClick={() => handleCategorySelect(category.name)}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
