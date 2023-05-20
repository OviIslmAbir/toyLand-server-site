const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    client.connect();
    const marvelToysCollection = client.db('toyLand').collection('marvelToy')
    const transformerToysCollection = client.db('toyLand').collection('transformerToys')
    const starToysCollection = client.db('toyLand').collection('starToy')
    const addToysCollection = client.db('toyLand').collection('addToy')


    // marvel toys 
    app.get('/marvelToys', async(req, res) => {
        const cursor = marvelToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/marvelToys/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result =  await marvelToysCollection.findOne(query)
      res.send(result)
    })
    
    // transformer toys
    app.get('/transformerToys', async(req, res) => {
        const cursor = transformerToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/transformerToys/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result =  await transformerToysCollection.findOne(query)
      res.send(result)
    })

    // star wars toys
    app.get('/starToys', async(req, res) => {
        const cursor = starToysCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/starToys/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result =  await starToysCollection.findOne(query)
      res.send(result)
    })

    // add toys
    app.get('/addToys', async(req, res) => {
      const cursor = addToysCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/addToys/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result =  await addToysCollection.findOne(query)
      res.send(result)
    })

    app.get('/addToy', async(req, res) => {
      const query = {email: req.query.email}
      const result = await addToysCollection.find(query).toArray()
      res.send(result)
    })
    
    app.get('/addToy/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result =  await addToysCollection.findOne(query)
      res.send(result)
    })

    app.post('/addToy', async(req, res) =>{
      const toys = req.body
      const result = await addToysCollection.insertOne(toys)
      res.send(result)
    })

    app.delete('/addToy/:id', async(req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await addToysCollection.deleteOne(query)
      res.send(result)
    })

    app.put('/addToy/:id', async(req, res) => {
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateToy = req.body
      const toy = {
          $set:{
              price: updateToy.price,
              quantity: updateToy.quantity ,
              details: updateToy.details,
          }
      }
      const result = await addToysCollection.updateOne(filter, toy , options)
      res.send(result)
    })
    // search toy 
    app.get('/searchToy', async(req, res) => {
      const query = {toyName: req.query.toyName}
      const result = await addToysCollection.find(query).toArray()
      res.send(result)
    })
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    
  }
}
run().catch(console.log);

app.get('/', (req, res) => {
    res.send('Toy Land is running')
})
  
app.listen(port, () => {
    console.log(`Toy Land is running on port ${port}`)
})