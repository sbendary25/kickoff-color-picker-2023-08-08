var namer = require("color-namer");
import s from "./styles.module.css";

/**
 * Color component that displays a color block with its name and RGB value.
 *
 * @param {Array} rgb - An array of three integers representing the red, green, and blue color values.
 * @param {Function} editColor - The function to call when the color block is clicked. Sets the copmponent as the color to be edited by the color picker.
 * @param {boolean} selected - Indicates if the color block is currently selected as the color to edit.
 * @param {boolean} activePalette - Indicates if the color block is part of the active palette. Used for styling when hovering over the activePalette's Color components.
 */

const Color = ({ rgb, editColor, selected, activePalette }) => {
  let formattedRGB = `rgb(${rgb.join(",")})`;
  const colorName = namer(formattedRGB, { pick: ["pantone"] }).pantone[0].name;

  return (
    <div
      className={`${s.color} ${selected ? s.selected : ".selected"} ${
        activePalette ? s.activePalette : ""
      }`}
      style={{ backgroundColor: formattedRGB }}
      onClick={editColor}
    >
      {activePalette ? (
        <div className={s.text}>
          <h4>{colorName}</h4>
          <p>{formattedRGB}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Color;
