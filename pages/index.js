import { useState, useEffect } from "react";
import Palette from "../components/palette";
import RGBControls from "../components/rgb_controls";
import Header from "../components/header";
import PaletteHistory from "../components/palette_history";
import axios from "axios";

const DEFAULT_PALETTE = {
  color1: [255, 255, 255],
  color2: [255, 255, 255],
  color3: [255, 255, 255],
  color4: [255, 255, 255],
  color5: [255, 255, 255],
};

const Home = () => {
  const [rgbControlValues, setRgbControlValues] = useState([0, 0, 0]);
  const [activeHeader, setActiveHeader] = useState("color_picker");
  const [activePaletteData, setActivePaletteData] = useState(DEFAULT_PALETTE);
  const [paletteHistory, setPaletteHistory] = useState([]);

  useEffect(() => {
    async function fetchPalettes() {
      const { data } = await axios.get("/api/palette");
      setPaletteHistory(data);
    }

    fetchPalettes();
  }, [axios]);

  const saveActivePalette = async () => {
    if (activePaletteData.id) {
      await axios.put("/api/palette", activePaletteData);
    } else {
      await axios.post("/api/palette", activePaletteData);
    }
    const { data } = await axios.get("/api/palette");
    setPaletteHistory(data);
  };

  const deletePalette = async () => {
    if (activePaletteData.id) {
      await axios.delete("/api/palette", {
        data: { id: activePaletteData.id },
      });
      const { data } = await axios.get("/api/palette");
      setPaletteHistory(data);
    }

    setActivePaletteData({ ...DEFAULT_PALETTE });
  };

  const clearPalette = () => {
    setActivePaletteData({ ...DEFAULT_PALETTE });
  };

  return (
    <div className="container">
      <Header activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
      <RGBControls
      activeHeader={activeHeader}
        rgbControlValues={rgbControlValues}
        setRgbControlValues={setRgbControlValues}
        savePallete={saveActivePalette}
        deletePalette={deletePalette}
        clearPalette={clearPalette}
      />
      <Palette
        activeHeader={activeHeader}
        paletteData={activePaletteData}
        activePalette={true}
        setActivePaletteData={setActivePaletteData}
        colorPickerValues={rgbControlValues}
        setColorPickerValues={setRgbControlValues} />
      <PaletteHistory
        activeHeader={activeHeader}
        palettes={paletteHistory}
        setActivePaelette={setActivePaletteData}
        setActiveHeader={setActiveHeader}
      />
    </div>
  );
};

export default Home;
