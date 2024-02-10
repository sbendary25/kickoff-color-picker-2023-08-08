import knex from "../../clients/knex";

export default async (req, res) => {
  if (req.method === "GET") {
    let palettes = await knex("palettes");
    palettes = palettes.map((palette) => ({
      ...palette,
      color1: JSON.parse(palette.color1),
      color2: JSON.parse(palette.color2),
      color3: JSON.parse(palette.color3),
      color4: JSON.parse(palette.color4),
      color5: JSON.parse(palette.color5),
    }));
    palettes.reverse();

    res.status(200).json(palettes);
  } else if (req.method === "PUT") {
    await knex("palettes")
      .where({ id: req.body.id })
      .update({
        color1: JSON.stringify(req.body.color1),
        color2: JSON.stringify(req.body.color2),
        color3: JSON.stringify(req.body.color3),
        color4: JSON.stringify(req.body.color4),
        color5: JSON.stringify(req.body.color5),
      });

    const [palette] = await knex("palettes")
      .where({ id: req.body.id })
      .limit(1);

    res.status(200).json(palette);
  } else if (req.method === "POST") {
    const newPalette = {
      color1: JSON.stringify(req.body.color1),
      color2: JSON.stringify(req.body.color2),
      color3: JSON.stringify(req.body.color3),
      color4: JSON.stringify(req.body.color4),
      color5: JSON.stringify(req.body.color5),
    };
    const [id] = await knex("palettes").insert(newPalette);

    const insertedPalette = await knex("palettes").where({ id }).first();

    res.status(201).json(insertedPalette);
  } else if (req.method === "DELETE") {
    const id = req.body.id;
    if (!id) {
      return res.status(400).json({ error: "No ID provided for deletion." });
    }

    const deletedRows = await knex("palettes").where({ id }).del();

    if (deletedRows) {
      res
        .status(200)
        .json({ message: `Palette with ID ${id} deleted successfully.` });
    } else {
      res.status(404).json({ error: `Palette with ID ${id} not found.` });
    }
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
