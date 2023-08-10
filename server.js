import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import ConnectDB from './config/db.js'
import colors from 'colors';
import authRoutes from './routes/authRoutes.js'



dotenv.config();

// database config
ConnectDB();


const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)


//rest api
app.get('/', (req, res) => {
    res.send("<h1> Welcome to E - Commerce App </h1>")
})


const PORT = process.env.PORT_NUMBER || 8080;
app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}/`)
})
