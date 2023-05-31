// Import:
const { Router, request } = require("express");
const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router();
const tagsController = new TagsController()

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes



// Implantando middleware:

// function myMiddleware(request, response, next) {
//   console.log(request.body)

//   if(!request.body.isAdmin) {
//     return response.json({ message: "Usuário sem permissões" })
//   }

//   next()
// }
// userRoutes.use(myMiddleware)

//Export: