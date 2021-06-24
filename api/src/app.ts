import express from 'express'
import config from './config'
import morgan from 'morgan'
import cors from 'cors';

import videosRoutes from './routes/videos.routes'

const app = express()

app.set('port', config.PORT)

app.use(cors()); //let to any server connect or make request
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'))

app.use(videosRoutes)

export default app;