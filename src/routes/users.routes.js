// Import:
const { Router, request } = require("express");
const UsersController = require("../controllers/UsersController")

const userRoutes = Router();
const usersController = new UsersController()


// Implantando middleware:
function myMiddleware(request, response, next) {
  console.log(request.body)

  if(!request.body.isAdmin) {
    return response.json({ message: "Usuário sem permissões" })
  }

  next()
}

//Método POST:
userRoutes.use(myMiddleware)
userRoutes.post("/", usersController.create);
userRoutes.put("/:id", usersController.update)

//Export:
module.exports = userRoutes;