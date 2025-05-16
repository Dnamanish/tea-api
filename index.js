import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea); // 201 refers to A new item was successfully created (POST).
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // anything comes from params is string
  if (!tea) {
    res.status(404).send("tea not found...");
  }
  return res.status(200).send(tea);
});

// update teas
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("tea not found...");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("tea not found...");
  }
  const deletedTea=teaData.splice(index, 1);
  return res.status(200).send(deletedTea);
});

app.listen(port, () => {
  console.log(`server is listening on ${port}.....`);
});
