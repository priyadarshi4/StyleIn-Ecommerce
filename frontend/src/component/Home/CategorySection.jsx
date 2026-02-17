import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categories from "../../constants/categories";
import "./CategorySection.css";

function CategorySection() {
  return (
    <div className="category_wrapper">
      <div className="category_container_card">

        <h3 className="category_title">CATEGORIES</h3>

        <motion.div
          className="category_section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="category_card"
            >
              <div className="category_icon">
                <img src={cat.image} alt={cat.name} />
              </div>
              <p>{cat.name}</p>
            </Link>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default CategorySection;
