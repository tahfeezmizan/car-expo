const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    // 'https://carexpo-ec700.web.app',
    // 'https://carexpo-ec700.firebaseapp.com'
  ],
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
  console.log('Log Info:', req.method, req.url);
  next()
}

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log('middle ware token: ', token);
  if (!token) {
    return res.status(401).send({ message: "UnAuthorized Token" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // error
    if (err) {
      return res.status(401).send({ message: "UnAuthorized Token" })
    }

    //decode
    req.decoded = decoded;
    next()
  })
}

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const serviceCollection = client.db("car_expoDB").collection('services');
    const bookingsCollection = client.db("car_expoDB").collection('bookings');

    //auth releted api
    app.post('/jwt', logger, async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
      console.log(user);
      console.log("token: ", { token });
      res
        .cookie('token', token, cookieOption)
        .send({ sucess: true })
    })

    // logout api
    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('logout user', user);
      res
        .clearCookie('token', { ...cookieOption, maxAge: 0 })
        .send({ sucess: true });
    })



    //services releted api

    // get services all data 
    app.get('/services', logger, async (req, res) => {
      try {
        const filter = req.query;
        console.log(filter);

        const query = {        }

        const options = {
          sort: {
            price: filter.sort === 'asc' ? 1 : -1,
          }

        }

        const result = await serviceCollection.find(query, options).toArray();
        res.status(200).json({
          sucess: true,
          message: "Services Data Fetch Sucessfully",
          data: result,
        })
      } catch (error) {
        res.send(5000).json({
          sucess: false,
          message: "Services Data Not Found!",
          error,
        })
      }
    })


    // get service specifc data using id
    app.get('/services/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
          projection: { title: 1, price: 1, service_id: 1 }
        }
        const result = await serviceCollection.findOne(query, options);
        res.status(200).json({
          sucess: true,
          message: "Specific service fetch sucessfully!",
          data: result,
        })

      } catch (error) {
        res.status(500).json({
          sucess: false,
          message: "Service not found!",
          error: {
            code: 404,
            message: error.lenght > 0 ? error : "Somting went wrong"
          }
        })
      }
    })

    // send code this email 
    // ismailjosim99@gmail.com

    // booking
    //bookings desplay by email
    app.get('/bookings', verifyToken, async (req, res) => {
      // Who is logged in and who is get data
      const email = req.query.email
      if (!email) {
        res.send([])
      }
      const decodedEmail = req.decoded.email
      if (email !== decodedEmail) {
        res.status(403).send({ message: 'Forbidden Access' })
      }
      const query = { email: email }

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
    // await client.db("admin").command({ ping: 1 });
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