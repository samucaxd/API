const { hash, compare } = require("bcryptjs")
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
      WHERE email = (?)`, 
      [email]
    )

    if(checkUserExist) {
      throw new AppError('Este e-mail já está cadastrado.')
    }

    if(!username) {
      throw new AppError("Nome é obrigatório!")
    }

    const hashedPassword = await hash(password, 8)

    await database.run(`
      INSERT INTO users
      (username, email, password)
      VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async update(request, response) {
    const { username, email, password, old_password } = request.body
    const { id } = request.params
    const database = await sqliteConnection()
    const user = await database.get(`
      SELECT * FROM users
      WHERE id = (?)`,
      [id]
    )

    if(!user) {
      throw new AppError("Usuário não encontrado!")
    }

    const userWithUpdatedEmail = await database.get(`
      SELECT * FROM users
      WHERE email = (?)`,
      [email]
    )

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    }

    user.username = username
    user.email = email
    
    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para continuar.")
    }

    if(password == old_password) {
      throw new AppError("A senha nova precisa ser diferente da senha atual.")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga está incorreta.")
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      username = ?,
      email = ?,
      password = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.username, user.email, user.password, new Date(), id]
    )

    return response.json()
  }
}

module.exports = UsersController



