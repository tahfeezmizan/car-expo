const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// custom middleware
const logger = async (req, res, next) => {
  console.log('middleware called:', req.host, req.originalUrl);
  next()
}

// const verifyToken = async (req, res, next) => {
//   const token = req.cookies?.token;
//   // console.log('Verify Token', token);
//   if (!token) {
//     return res.status(401).send({ message: "unauthorized" });
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     //error
//     if (err) {
//       console.log('verify token error:', err);
//       return res.status(401).send({ message: "unauthorized" })
//     }
//     //decoded
//     console.log('decoded Token value:', decoded);
//     req.user = decoded;
//     next()
//   })
// }

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).send({ message: "UnAuthorized Token" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // error
    if (err) {
      return res.status(401).send({ message: "UnAuthorized Token" })
    }

    //decode
    req.user = decoded;
    next()
  })
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db("car_expoDB").collection('services');
    const bookingsCollection = client.db("car_expoDB").collection('bookings');

    //auth releted api
    app.post('/jwt', logger, async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
      console.log(user);
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: false,
          // sameSite: 'none'
        })
        .send({ sucess: true })
    })


    //services releted api

    // get services all data 
    app.get('/services', logger, async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    // get service specifc data using id
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = {
        projection: { title: 1, price: 1, service_id: 1 }
      }
      const result = await serviceCollection.findOne(query, options);
      res.send(result)
    })

    // booking
    //bookings desplay by email
    app.get('/bookings', logger, verifyToken, async (req, res) => {
      // console.log('TOOO token cookies:', req.cookies.token);
      console.log("user valide token", req.user);
      if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden Access" })
      }

      let query = {};

      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const cursor = bookingsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })

    // user booking data store on database
    app.post('/bookings', async (req, res) => {
      const bookings = req.body
      const result = await bookingsCollection.insertOne(bookings);
      res.send(result)
    })

    //update
    app.patch('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateBookings = req.body;
      // console.log(updateBookings);
      const updateDoc = {
        $set: {
          status: updateBookings.status
        }
      };
      const result = await bookingsCollection.updateOne(filter, updateDoc);
      res.send(result)
    });

    // delete
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingsCollection.deleteOne(query);
      res.send(result)
    })

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