import express from 'express'
import{ db }from './db'
const app = express();
app.use(express.json());


app.post('/sum', async (req,res)=>{
    const {num1,num2} = req.body;
    const sum = num1 + num2;

    const result = await db.request.create({
        data:{
            a:num1,
            b:num2,
            sum,
            type:"ADD"
        }
    })
    res.send({sum, id:result.id });
})

export default app;