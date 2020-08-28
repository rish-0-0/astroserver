const express = require("express");
const cors = require("cors");
const v1Router = require("./v1Router/index.routes");
const app = express();

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/", v1Router);

app.use((_, res) =>
  res.status(404).send({ message: "Endpoint Not found", success: false })
);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
