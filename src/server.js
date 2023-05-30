require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const express = require("express");
const app = express(); // Execução do express
const PORT = 3000; // Definição da porta
const AppError = require("./utils/AppError");

const routes = require("./routes");

migrationsRun();

app.use(express.json());
app.use(routes);
app.use(( error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(PORT, function() {
  console.log(`The server is running on PORT: ${PORT}`);
});






