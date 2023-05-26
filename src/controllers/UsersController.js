const AppError = require("../utils/AppError")


class UsersController {
  /**
   * 5 métodos para o Controller:
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para deletar um registro.
   */

  create(require, response) {
    const { username, email, password } = require.body;

    if(!username) {
      throw new AppError("Nome é Obrigatório!")
    }

    response.status(201).json({ username, email, password });

  }
}

module.exports = UsersController