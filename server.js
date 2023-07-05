//@@ import dependencies
import app from './app.js'
import { serverPort } from './secret.js'
import colors from 'colors'

//@@ listening the server
app.listen(serverPort,() => {
  console.log(`Server is listening on : ${serverPort}`.bgBlue.black)
})