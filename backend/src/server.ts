import express,{Request,Response,NextFunction} from 'express'
import cors from 'cors'

const app=express()
const PORT=5178
app.use(express.json())
app.use(cors({
    origin:'*',
    credentials:true
}))

import searchRoutes from './routes/search.routes'
app.use('/api',searchRoutes)

app.listen(PORT,()=>{
    console.log(`THE SERVER IS RUNNING ON http://localhost:${PORT}`)
})