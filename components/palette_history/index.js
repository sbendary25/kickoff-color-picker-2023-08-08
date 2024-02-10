import Palette from "../palette";

import s from "./styles.module.css";

/**
 * PaletteHistory component that displays a list of palettes saved in the database.
 *
 * @param {string} activeHeader - The identifier of the currently active header. Used for css display purposes.
 * @param {Function} setActiveHeader - The function to update the state of the active header. Used to change the view to "color_picker" when a palette from PaletteHistory is selected.
 * @param {Array} palettes - An array of palette objects to be displayed. Queried from the database.
 * @param {Function} setActivePaelette - The function to set the active palette.
 */

const PaletteHistory = ({
  activeHeader,
  setActiveHeader,
  palettes,
  setActivePaelette,
}) => {
  return (
    <div
      className={`${s.parent} ${
        activeHeader === "palette_history" ? s.active : s.inactive
      }`}
    >
      {palettes.map((paletteData) => {
        return (
          <Palette
            paletteData={{ ...paletteData }}
            activeHeader={activeHeader}
            listItem={true}
            onClick={() => {
              setActivePaelette({ ...paletteData });
              setActiveHeader("color_picker");
            }}
          />
        );
      })}
    </div>
  );
};

export default PaletteHistory;
