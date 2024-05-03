const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db("car_expoDB").collection('services');

    // get services all data 
    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // get service specifc data using id
    // app.get('/services/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = {_id: new ObjectId(id)};
    //   const options = {
    //     projection: {title: 1, price: 1, service_id: 1}
    //   }
    //   const result = await serviceCollection.findOne(query,  options);
    //   res.send(result)
    // })

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error('Invalid ObjectId format');
        }
        const query = {_id: new ObjectId(id)};
        const options = {
          projection: {title: 1, price: 1, service_id: 1}
        }
        const result = await serviceCollection.findOne(query, options);
        if (!result) {
          return res.status(404).json({ error: 'Service not found' });
        }
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid request' });
      }
    });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('CarExpo Server is runing!')
})

app.listen(port, () => {
  console.log(`CarExpo Server is running on ${port}`)
})