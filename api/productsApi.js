const cors = require("cors");
const express = require("express");

const app = express();
const port = 1337;

app.use(cors({origin: "*"}));

app.get("/products", (req, res) => {
  res.status(200).json(
      [
          {id: 1, name: "Apples", country: "Italy", cost: 3, instock: 10},
          {id: 1, name: "Oranges", country: "Spain", cost: 4, instock: 3},
          {id: 1, name: "Beans", country: "USA", cost: 2, instock: 5},
          {id: 1, name: "Cabbage", country: "USA", cost: 1, instock: 8},
          {id: 1, name: "Banana", country: "Brazil", cost: 9, instock: 45},
      ]
  );
});

app.listen(port, () => {
  console.log("listening...");
});