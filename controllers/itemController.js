import { itemModel } from "../models/itemModel.js";

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();

    res.setHeader("Content-type", "application/json"); //A response header is set indicating that the content type is JSON
    res.end(JSON.stringify(items)); //The server then sends a response to the client with a JSON string that contains all the items received
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

export const createItem = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const item = JSON.parse(body);
      await itemModel.createItem(item);
      res.statusCode = 201;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify("Ok"));
    });
  } catch {
    res.statusCode = 500;
    res.end(`Error: ${err.message} `);
  }
};

export const updateItem = async (req, res, id) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const item = JSON.parse(body);
      await itemModel.updateItem(id, item);
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.end(JSON.stringify({ message: `Item with ID: ${id} updated.` }));
    });
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message} `);
  }
};

export const deleteItem = async (req, res, id) => {
  try {
    await itemModel.deleteItem(id);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: `Item with ID: ${id} deleted.` }));
  } catch (err) {
    res.statusCode = 500;
    res.end(`Error: ${err.message}`);
  }
};
