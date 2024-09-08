import http from "http";
import { getItems } from "./controllers/itemController.js";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const { pathname } = url;

  if (req.method == "GET" && pathname == "/items") {
    await getItems();
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
