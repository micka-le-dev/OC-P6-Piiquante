const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const log = require('./utils/logConsole')

const port = require('./var').port

console.log('')
console.log('==============================================================================================================')
console.log('')
console.log('')
console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Paris' }).format(new Date()))
console.log('')
log.force('Start server')

app.set('port', port)


const listening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    log.force('Server listen on '+ bind)
}
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
      case 'EACCES':
        log.error(bind + ' requires elevated privileges.')
        console.error('')
        console.error('')
        process.exit(1)
        break
      case 'EADDRINUSE':
        log.error(bind + ' is already in use.')
        console.error('')
        console.error('')
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


mongoose.set('strictQuery', true)
log.force('Connexion à MongoDB en cours...')
mongoose.connect('mongodb+srv://go-fullstack-v3-fr:QCwY6hhLnLxTl1vN@oc-p6-cours--go-fullsta.gnfmyuh.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => {
      log.force('Connexion à MongoDB réussie !                 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      console.log('')
      console.log('')
    })
    .catch(() => {
      log.error('>>>>>>>>>>>>>>>>>>>>>>  Connexion à MongoDB échouée !   <<<<<<<<<<<<<<<<<<<<<<')
      console.error('')
      console.error('')
    })