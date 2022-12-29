const http = require('http')
const app = require('./app')

console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Paris' }).format(new Date()))
console.log('Start server')

const port = process.env.PORT || 3000
app.set('port', port)



const listening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Server listen on '+ bind)
}
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.')
        process.exit(1)
        break
      default:
        throw error
    }
}


const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', listening)
server.listen(port)
