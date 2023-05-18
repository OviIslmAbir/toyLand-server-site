const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.maovuz9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // await client.connect();


    const toysCollection = client.db('toyLand').collection('heros')
    const marvelToysCollection = client.db('toyLand').collection('marvelToy')
    const transformerToysCollection = client.db('toyLand').collection('transformerToys')
    const starToysCollection = client.db('toyLand').collection('starToy')

    app.get('/toys', async(req, res) => {
        const cursor = toysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/marvelToys', async(req, res) => {
        const cursor = marvelToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/transformerToys', async(req, res) => {
        const cursor = transformerToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/starToys', async(req, res) => {
        const cursor = starToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Toy Land is running')
})
  
app.listen(port, () => {
    console.log(`Toy Land is running on port ${port}`)
})