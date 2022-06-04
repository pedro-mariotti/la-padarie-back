const http = require('http')
const app = require('./app')
const port = process.PORT || 3000
const server = http.createServer(app)

server.listen(port, () => console.log('Server rodando na porta', port))
