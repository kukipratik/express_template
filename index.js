const express = require('express');
const { sendSuccess, sendError } = require('./utils/response');
const app = express();

app.use(express.json());

app.get('/items', (req, res) => {
  const items = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
  ];
  sendSuccess(res, {
    data: { items, total: items.length },
    message: "Items fetched successfully.",
    statusCode: 200
  });
});

app.get('/fail', (req, res) => {
  sendError(res, {
    message: "Resource not found.",
    error_code: "NOT_FOUND",
    statusCode: 404
  });
});

app.post('/validate', (req, res) => {
  sendError(res, {
    message: "Validation failed.",
    error_code: "VALIDATION_ERROR",
    statusCode: 422,
    errors: { email: ["Email is required."], password: ["Password too short."] }
  });
});

app.listen(8000, () => console.log('Server running on port 8000'));
