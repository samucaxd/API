
// Grava a porta informada na variável "PORT"
app.listen(PORT, function() {
  console.log(`The server is running on PORT: ${PORT}`)
})

// ROUTE PARAMS:
// (Os parâmetros são obrigatórios)
app.get("/message/:id/:user", function(request, response) {
  const { id, user } = request.params
  
  response.send(`
    Message ID: ${id}
    Username test: ${user}
  `)
// Estrutura Route Params:
// /message/:id/:user
})


// QUERY PARAMS:
// (Os parâmetros são opcionais e a estrutura é diferente)
app.get("/users", (request, response) => {
  const { page, limit } = request.query

  response.send(`
    Página: ${page}
    Limite: ${limit}
  `)
  // Estrutura Query params:
  // /users?page=value&limit=value
})