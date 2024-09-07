import http from "http";

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const { pathname } = url;

  if (req.method == "GET" && pathname == "/hello-world") {
    res.end("<h1>Hello World</h1>");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
