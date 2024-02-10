import { useState, useEffect } from "react";

import s from "./styles.module.css";

/**
 * RGBControls component that provides sliders and number inputs for adjusting RGB values.
 *
 * @param {string} activeHeader - The identifier of the currently active header.
 * @param {Array} rgbControlValues - An array of three integers representing the RGB values. Initalized on the parent component in order to pass to other sibling components.
 * @param {Function} setRgbControlValues - The function to update the state of the RGB values. Initialized on the parent component in order to pass to other sibling components.
 * @param {Function} savePallete - The function to save the current palette.
 * @param {Function} deletePalette - The function to delete the selected palette.
 * @param {Function} clearPalette - The function to clear the current palette.
 */

const RGBControls = ({
  activeHeader,
  rgbControlValues,
  setRgbControlValues,
  savePallete,
  deletePalette,
  clearPalette,
}) => {
  return (
    <div
      className={`${s.rgbControls} ${
        activeHeader == "color_picker" ? s.active : s.inactive
      }`}
    >
      {["Red", "Green", "Blue"].map((color, index) => (
        <div key={color} className={s.colorControl}>
          <input
            type="number"
            id={s[color.toLowerCase() + "Number"]}
            min="0"
            max="255"
            value={rgbControlValues[index]}
            onChange={(e) => {
              let value = parseInt(e.target.value);
              if (value < 0) {
                value = 0;
              } else if (value > 255) {
                value = 255;
              }
              const newValues = [...rgbControlValues];
              newValues[index] = value;
              setRgbControlValues(newValues);
            }}
          />
          <input
            type="range"
            id={s[color.toLowerCase() + "Input"]}
            min="0"
            max="255"
            value={rgbControlValues[index]}
            onChange={(e) => {
              const newValues = [...rgbControlValues];
              newValues[index] = parseInt(e.target.value);
              setRgbControlValues(newValues);
            }}
          />
        </div>
      ))}
      <div className={s.buttonGroup}>
        <button onClick={clearPalette}>Clear</button>
        <button onClick={savePallete}>Save</button>
        <button onClick={deletePalette}>Delete</button>
      </div>
    </div>
  );
};

export default RGBControls;
