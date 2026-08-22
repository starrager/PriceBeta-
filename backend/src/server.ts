import express,{Request,Response,NextFunction} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import logger from './logger'

const limiter=rateLimit({
    windowMs:60*1000,
    max:100,
    message:'too much requests please try later'
})
const app=express()
const PORT=process.env.JWT_PORT||5178

app.use(helmet())
app.use(express.json())
app.use(cors({
    origin:'*',
    credentials:true
}))

import searchRoutes from './routes/search.routes'
import middleware from './routes/auth.routes'

app.use('/api',limiter,searchRoutes)
app.use('/api/auth',limiter,middleware)

app.get('/health',(req,res)=>{
    res.json({
        status:'ok',
        timestamp:new Date().toISOString(),
        uptime:process.uptime(),
    })
})

app.listen(PORT,()=>{
    logger.info(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})