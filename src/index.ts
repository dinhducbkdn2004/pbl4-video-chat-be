import express, { Express } from 'express'
import { createServer, Server } from 'http'
import configApp from './configs/app.config'
import connectDb from './configs/database.config'
import env from './configs/env'
import initSocketIO from './socket/socket'

const app: Express = express()
const PORT: string | number = env.PORT || 3000
const httpServer: Server = createServer(app)

connectDb()

configApp(app)

initSocketIO(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
