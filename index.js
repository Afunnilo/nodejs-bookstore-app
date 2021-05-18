const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json())
const MongoClient = require('mongodb').MongoClient

// set up mongoose
const mongoose = require('mongoose');
const connectionString = process.env.connection_string || 'localhost:27017/crudapp'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}, (err)=> {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected succesfully')
    }
})


//create schema
const dataSchema = new mongoose.Schema({
    name : String,
    email: String,
    country: String
})
const Data = mongoose.model('Data', dataSchema)

// post request to /datas to create new data
app.post('/datas', (req,res)=>{
    
    // create new data
    Data.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, newData)=>{
        if(err) {
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({message:"New Data Created", newData})
        }
    })
})
// GET request to /datas to get the data
app.get('/datas', (req,res)=>{
    Data.find({}, (err, datas)=>{
        if(err) {
            return res.status(500).json({message:err})
        } else{
            return res.status(200).json({ datas })
        }
    })
})
 // PUT request to update data
 app.put('/datas/:id', (req, res)=>{
     Data.findByIdAndUpdate(req.params.id, {
         name: req.body.name,
         email: req.body.email,
         country: req.body.country
     }, (err, data)=>{
        if(err) {
            return res.status(500).json({message:err})
        } else if (!data){
            return res.status(404).json({message:"Data not found"})
        } else{
            data.save((err, savedData)=>{
                if(err){
                    return res.status(400).json({message: err})
                } else{
                    return res.status(200).json({message:"Data updated sucessfuly"})
                }
            })
        }

     })
 })

 // DELETE request to delete data
 app.delete('/datas/:id', (req,res)=>{
        Data.findByIdAndDelete(req.params.id, (err,data)=>{
            if(err){
                return res.status(500).json({message: err})
            } else if(!data){
                return res.status(404).json({message: "Data not found"})
            }else{
                return res.status(200).json({message: "Data deleted successfuly"})
            }
        })
 })






app.listen(port, ()=>console.log(`app is listening on ${port}`))
