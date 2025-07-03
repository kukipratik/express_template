const express = require('express');
const { sendSuccess, sendError } = require('./utils/response');
const app = express();

app.use(express.json());

app.get('/items', (req, res) => {
  const items = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
  ];
  sendSuccess(res, { items, total: items.length }, "Items fetched successfully.", 200);
});

app.get('/fail', (req, res) => {
  sendError(res, "Resource not found.", "NOT_FOUND", 404);
});

app.post('/validate', (req, res) => {
  sendError(
    res,
    "Validation failed.",
    "VALIDATION_ERROR",
    422,
    { email: ["Email is required."], password: ["Password too short."] }
  );
});

app.listen(8000, () => console.log('Server running on port 8000'));
