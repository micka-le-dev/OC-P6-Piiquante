const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const log = require('./utils/logConsole')

const beginConnectMongoDB = require('./var').beginConnectMongoDB
const port = require('./var').port

console.log('')
console.log('==============================================================================================================')
console.log('')
console.log('')
console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Paris' }).format(new Date()))
console.log('')
log.log('Start server')

app.set('port', port)


const listening = () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    log.log('Server listen on '+ bind)
    if( beginConnectMongoDB ){
      console.log('')
      console.log('')
    }
}
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
      case 'EACCES':
        log.erreur(bind + ' requires elevated privileges.')
        console.error('')
        console.error('')
        process.exit(1)
        break
      case 'EADDRINUSE':
        log.erreur(bind + ' is already in use.')
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

if( ! beginConnectMongoDB )
  server.listen(port)



mongoose.set('strictQuery', true)
log.log('Connexion à MongoDB en cours...')
mongoose.connect('mongodb+srv://go-fullstack-v3-fr:QCwY6hhLnLxTl1vN@oc-p6-cours--go-fullsta.gnfmyuh.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => {
      log.log('Connexion à MongoDB réussie !                 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      if( beginConnectMongoDB )
        server.listen(port)
      else{
        console.log('')
        console.log('')
      }
    })
    .catch(() => {
      log.erreur('Connexion à MongoDB échouée !')
      console.error('')
      console.error('')
    })