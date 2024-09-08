import { itemModel } from "../models/itemsModel.js";

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();

    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(items));
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
}; //getItems - Model call, and within the model, a call to the database
