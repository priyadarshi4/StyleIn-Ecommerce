import React, { useState, useEffect } from "react";
import "./SpinWheel.css";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  { label: "10% OFF", color: "linear-gradient(135deg, #ff4d4d, #ff1a1a)" },
  { label: "20% OFF", color: "linear-gradient(135deg, #ff944d, #ff6600)" },
  { label: "FREE SHIPPING", color: "linear-gradient(135deg, #4dff88, #00cc44)" },
  { label: "₹100 CASHBACK", color: "linear-gradient(135deg, #4dd2ff, #0099cc)" },
  { label: "BUY 1 GET 1", color: "linear-gradient(135deg, #b84dff, #9900cc)" },
  { label: "TRY AGAIN", color: "linear-gradient(135deg, #ffd24d, #ffaa00)" },
];

const COOLDOWN_MS = 12 * 60 * 60 * 1000; // 12 hours

const SpinWheel = ({ debug = false }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);
  const [isWin, setIsWin] = useState(false);

  /* ================= INITIAL VISIBILITY CHECK ================= */
  useEffect(() => {
    const lastSpinTime = localStorage.getItem("spin_timestamp");

    // 🔧 FORCE SHOW IN DEBUG MODE
    if (debug) {
      setShow(true);
      return;
    }

    // 🆕 FIRST VISIT (NO SPIN YET)
    if (!lastSpinTime) {
      setShow(true);
      return;
    }

    // ⏱ CHECK COOLDOWN
    const elapsed = Date.now() - parseInt(lastSpinTime, 10);

    if (elapsed >= COOLDOWN_MS) {
      // ✅ COOLDOWN OVER → ALLOW SPIN
      setShow(true);
    } else {
      // ⛔ COOLDOWN ACTIVE → SILENT BLOCK
      setShow(false);
    }
  }, [debug]);

  /* ================= SPIN LOGIC ================= */
  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);
    setIsWin(false);

    const index = Math.floor(Math.random() * offers.length);
    const slice = 360 / offers.length;
    const winAngle = index * slice + slice / 2;
    const spins = 3 + Math.random() * 3;
    const deg = rotation + spins * 360 - (winAngle - 180);

    setRotation(deg);

    setTimeout(() => {
      const label = offers[index].label;

      /* 🎟 SAVE COUPON (AUTO-APPLY READY) */
      if (label !== "TRY AGAIN") {
        const coupon = {
          code: label.replace(/\s+/g, "_"),
          label,
          type: label.includes("%")
            ? "PERCENT"
            : label.includes("₹")
            ? "FLAT"
            : "OTHER",
          value: label.includes("%")
            ? parseInt(label, 10)
            : label.includes("₹")
            ? 100
            : 0,
        };

        localStorage.setItem("spin_coupon", JSON.stringify(coupon));
      } else {
        localStorage.removeItem("spin_coupon");
      }

      // ⏱ SAVE SPIN TIME
      localStorage.setItem("spin_timestamp", Date.now().toString());

      setResult(label);
      setIsWin(label !== "TRY AGAIN");
      setSpinning(false);

      // ❌ CLOSE POPUP AFTER SPIN
      setTimeout(() => setShow(false), 1200);
    }, 4200);
  };

  /* ================= DEBUG / TRY AGAIN RESET ================= */
  const reset = () => {
    setRotation(0);
    setResult(null);
    setIsWin(false);
    localStorage.removeItem("spin_coupon");
    localStorage.removeItem("spin_timestamp");
    setShow(true);
  };

  if (!show) return null;

  /* ================= UI ================= */
  return (
    <AnimatePresence>
      <motion.div
        className="spin-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="spin-box"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2>🏆 Spin & Win Rewards</h2>
          <p className="subtitle">
            Spin the wheel to unlock exciting offers
          </p>

          <div className="wheel-area">
            <motion.div
              className="wheel"
              animate={{ rotate: rotation }}
              transition={{
                duration: 4,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {offers.map((offer, i) => (
                <div
                  key={i}
                  className="wheel-segment"
                  style={{
                    transform: `rotate(${i * (360 / offers.length)}deg)`,
                    background: offer.color,
                  }}
                >
                  <span>{offer.label}</span>
                </div>
              ))}
            </motion.div>

            <div className="wheel-center">
              <motion.button
                onClick={spin}
                disabled={spinning}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                {spinning ? "SPINNING..." : "SPIN"}
              </motion.button>
            </div>

            <div className="wheel-pointer" />
          </div>

          {result && (
            <motion.div
              className={`result-box ${isWin ? "win" : ""}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220 }}
            >
              🎁 You won <b>{result}</b>!
              {debug && (
                <motion.button
                  onClick={reset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    marginTop: "0.6rem",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem",
                    borderRadius: "6px",
                  }}
                >
                  Reset (Debug)
                </motion.button>
              )}
            </motion.div>
          )}

          <motion.button
            className="close"
            onClick={() => setShow(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpinWheel;
