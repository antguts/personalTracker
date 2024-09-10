import express from 'express'
import {getGas, getGasStop, postGas} from './db.js'




const app = express()

app.get("/gas", async (req, res)=>{
    const notes = await getGas() 
    res.send(notes)
    // res.send('this should be the notes')
})

app.get("/gas/:id", async (req, res)=>{
    const id = req.params.id
    const note = await getGasStop(id)
    res.send(note)
    // res.send('this should be the notes')
})



app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).send('Something Broke')
})

app.listen(8080, ()=>{
    console.log('Server is running on port 8080')
})