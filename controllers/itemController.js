import { itemModel } from "../models/itemModel.js";

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

export const getItemById = async (req, res, id) => {
  try {
    const item = await itemModel.getItemById(id);

    if (!item) {
      res.statusCode = 404;
      res.end(`Item with ID: ${id} not found`);
    } else {
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify(item));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message} `);
  }
};
