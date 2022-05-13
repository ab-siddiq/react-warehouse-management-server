const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogcfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const stockCollection = client.db('productStock').collection('stocks');
        //get stock
        app.get('/stocks', async(req,res)=>{
            const query = {};
            const cursor = stockCollection.find(query);
            const stocks = await cursor.toArray();
            res.send(stocks);
        })
        //post stock 
        app.post('/stock',async(req,res)=>{
            const newStock = req.body;
           const result = await stockCollection.insertOne(newStock);
            res.send(result)
        })

        //delete stock
        app.delete('/stock/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await stockCollection.deleteOne(query);
            res.send(result);
        })

        //update stock

        app.put('/stock/:id', async(req,res)=>{
            const id = req.params.id;
            const updateStock = req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert:true};
            const updatedDoc = {
                $set: {updateStock}
            }
            const result = await stockCollection.updateOne(filter,updatedDoc,options);
            res.send(result);
        })

        app.get('/stock/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await stockCollection.findOne(query);
            res.send(result);
        })

    }finally{

    }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log('listening to port=>',port);
})
//scyJADhzw5Lkw2Db
//express
app.get('/',(req,res)=>{
    res.send('server');
})

app.get('/user',(req,res)=>{
    res.send('user')
})


