import Color from "../color";
import { useState, useEffect } from "react";

import s from "./styles.module.css";

/**
 * Palette component that displays a collection of Color components.
 *
 * @param {string} activeHeader - The identifier of the currently active header. Used for css display purposes.
 * @param {Object} paletteData - An object containing color and id (if a saved palette) data for the palette.
 * @param {boolean} activePalette - Indicates if the palette is currently the active palette.
 * @param {Function} setActivePaletteData - The function to update the state of the palette data. Used to update the active palettes color data when using the color picker.
 * @param {Array} colorPickerValues - An array of three integers representing the RGB values of current values of the color picker.
 * @param {Function} setColorPickerValues - The function to update the state of the color picker values. Used to update color picker values to the active Color components values.
 * @param {boolean} listItem - Indicates if the palette is a list item in the palette history.
 * @param {Function} onClick - The function to call when the palette is clicked. Used to select a Palette from PaletteHistory as the active palette.
 */

const Palette = ({
  activeHeader,
  paletteData,
  activePalette,
  setActivePaletteData,
  colorPickerValues,
  setColorPickerValues,
  listItem,
  onClick,
}) => {
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (edit) {
      let tmpPaletteData = paletteData;
      tmpPaletteData[edit] = colorPickerValues;
      setActivePaletteData({ ...tmpPaletteData });
    }
  }, [colorPickerValues]);

  const onColorClick = (key) => {
    if (activePalette) {
      setColorPickerValues(paletteData[key]);
      setEdit(key);
    }
  };

  const render =
    (activePalette && activeHeader == "color_picker") ||
    (listItem && activeHeader == "palette_history");

  return (
    <div
      className={`${s.palette} ${listItem ? s.history : ""} ${
        render ? s.active : s.inactive
      }`}
      onClick={onClick}
    >
      {Object.entries(paletteData).map(([key, values]) => {
        if (key !== "id") {
          return (
            <Color
              activePalette={activePalette}
              selected={key === edit}
              rgb={values}
              onClick={() => onColorClick(key)}
            />
          );
        }
      })}
    </div>
  );
};

export default Palette;
