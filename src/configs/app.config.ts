import { Express, Response } from 'express'
import cors from 'cors'
import corsOptions from './cors.config'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import morgan from 'morgan'
import routes from './route.config'
const configApp = async (app: Express) => {
    app.use(cors(corsOptions))
    app.options('*', cors(corsOptions))

    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))
    app.get('/', (_, res: Response) => {
        res.send('Hello world from the API!')
    })
    
    app.use('/api/v1', routes)
}
export default configApp
