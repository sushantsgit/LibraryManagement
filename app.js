const express = require("express");
const yaml = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

const swaggerDocument = yaml.load("apidoc.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (_req, res) => {
  res
    .status(200)
    .send(
      `Hello from Library Management service!. To visit api docs visit <a href="./api-docs/">here</a>`
    );
});

// app.post("/users", (req, res) => {
//   console.log(req.body);
//   res.status(201).send({
//     id: Math.random() * 1e5,
//     name: req.body.name,
//     email: req.body.email,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     isActive: true,
//     role: "student",
//   });
// });

module.exports = app;
// Path: app.js
