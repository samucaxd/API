const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController {
  /**
   * 5 métodos para o Controller:
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para deletar um registro.
   */

  async create(require, response) {
    const { username, email, password } = require.body
    const database = await sqliteConnection()
    const checkUserExist = await database.get(`
      SELECT * FROM users
      WHERE email = (?)
    `, [email]
    )

    if(checkUserExist) {
      throw new AppError('Este e-mail já está cadastrado.')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(`
      INSERT INTO users
      (username, email, password)
      VALUES (?, ?, ?)
    `,[username, email, hashedPassword]
    )


    return response.status(201).json()
  }
}

module.exports = UsersController


// if(!username) {
//   throw new AppError("Nome é Obrigatório!")
// }

// response.status(201).json({ username, email, password });