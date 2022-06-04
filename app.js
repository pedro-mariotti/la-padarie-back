const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//Config do body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

//Info de log no terminal
app.use(morgan('dev'))

//Config do CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    )
    return res.status(200).send({})
  }
  next()
})

//Rotas
const userController = require('./user/controller/userController')

//Endpoint postman
app.use('/', userController)

//Rotas utilizadas caso as acima n sejam acessiveis
app.use((req, res, next) => {
  const error = new Error('Nao encontrado')
  error.status = 404
  next(error)
})

app.use((error, res) => {
  res.status(error.status || 500)
  return res.send({
    error: {
      mensagem: error.message
    }
  })
})

module.exports = app
