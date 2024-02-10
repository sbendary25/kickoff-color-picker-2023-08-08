import { useState, useEffect } from "react";
import s from "./styles.module.css";

/**
 * Header component that allows users to switch between different views.
 *
 * @param {"color_picker" | "palette_history"} activeHeader - The identifier of the currently active header.
 * @param {Function} setActiveHeader - The function to update the state of the active header.
 */

const Header = ({ activeHeader, setActiveHeader }) => {
  return (
    <div className={s.header}>
      <h3
        className={activeHeader === "color_picker" ? s.active : s.inactive}
        onClick={() => setActiveHeader("color_picker")}
      >
        Color Picker
      </h3>
      <h3
        className={activeHeader === "palette_history" ? s.active : s.inactive}
        onClick={() => setActiveHeader("palette_history")}
      >
        Palette History
      </h3>
    </div>
  );
};

export default Header;
