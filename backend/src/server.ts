import express,{Request,Response,NextFunction} from 'express'
import cors from 'cors'

const app=express()
const PORT=5178
app.use(express.json())
app.use(cors({
    origin:'*',
    credentials:true
}))

import send from './routes/test.routes'
app.use('/test',send)

app.listen(PORT,()=>{
    console.log(`THE SERVER IS RUNNING ON http://localhost:${PORT}`)
})