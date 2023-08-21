import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import ConnectDB from './config/db.js'
import colors from 'colors';
import authRoutes from './routes/authRoutes.js'
import cateogaryRoutes from './routes/cateogaryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'



dotenv.config();

// database config
ConnectDB();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/cateogary', cateogaryRoutes);
app.use('/api/v1/product', productRoutes);




//rest api
app.get('/', (req, res) => {
    res.send("<h1> Welcome to E - Commerce App </h1>")
})


const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}/`)
})
