import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./StillLooking.css";

const StillLooking = () => {

  // ✅ MUST BE INSIDE COMPONENT
  const { isAuthenticated, user } = useSelector((state) => state.userData);


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef();

  useEffect(() => {
  if (!isAuthenticated) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/ai/reminders", {
        withCredentials: true,
      });

      // ensure array only
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }

    } catch (err) {
      console.log("AI reminder failed:", err?.response?.status);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [isAuthenticated]);


  const scroll = (direction) => {
    const scrollAmount = 320;
    if (!rowRef.current) return;

    if (direction === "left") rowRef.current.scrollLeft -= scrollAmount;
    else rowRef.current.scrollLeft += scrollAmount;
  };

  if (!loading && products.length === 0) return null;

  return (
    <div className="still-wrapper">
      <h2 className="still-title">
        {user?.name || "Hey"}, still looking for these?
      </h2>

      <div className="slider-container">

        <button className="nav left" onClick={() => scroll("left")}>
          ❮
        </button>

        <div className="still-row" ref={rowRef}>
          {loading ? (
            <p style={{ padding: "40px" }}>Loading...</p>
          ) : (
            products.map((item) => (
              <div
                className="still-card"
                key={item._id}
                onClick={() => window.location.href = `/product/${item._id}`}
              >
                <img
                  src={item?.images?.[0]?.url || "/placeholder.png"}
                  alt={item.name}
                />
                <p>{item.category}</p>
              </div>
            ))
          )}
        </div>

        <button className="nav right" onClick={() => scroll("right")}>
          ❯
        </button>

      </div>
    </div>
  );
};

export default StillLooking;
