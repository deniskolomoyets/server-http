import http from "http";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "./controllers/itemController.js";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const { pathname } = url; //Destructuring

  if (req.method == "GET" && pathname == "/items") {
    await getItems(req, res);
  } else if (req.method == "GET" && pathname.startsWith("/items/")) {
    const id = pathname.split("/")[2];
    await getItemById(req, res, id);
  } else if (req.method == "POST" && pathname == "/items") {
    await createItem(req, res);
  } else if (req.method == "PUT" && pathname.startsWith("/items/")) {
    const id = pathname.split("/")[2];
    await updateItem(req, res, id);
  } else if (req.method === "DELETE" && pathname.startsWith("/items/")) {
    const id = pathname.split("/")[2];
    await deleteItem(req, res, id);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
