const express = require('express');
const cors = require('cors');
const { MongoClient,ObjectId } = require("mongodb");

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

//user: mydb
//password: UKdnt9Eptn2XYyfR

const uri = "mongodb+srv://mydb:UKdnt9Eptn2XYyfR@cluster0.clkdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db('users');
      const userCollection = database.collection('userDocuments');
      app.get('/users',async(req,res)=>{
        const users = userCollection.find({});
        const usresArray = await users.toArray();
         console.log(usresArray);
        res.send(usresArray);
      })
      app.get('/update/users/:idk',async(req,res)=>{
          const id = req.params.idk;
          const query = {_id: ObjectId(id)};
          const user = await userCollection.findOne(query);
          res.json(user) ;
      })

      app.post('/users',async(req,res)=>{
        const newUser = req.body;
        //console.log(user);
        const result = await userCollection.insertOne(newUser);
        res.json(newUser);

      })
      app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
       const query = {_id: ObjectId(id)};
       const result = await userCollection.deleteOne(query);
       res.send(result);

      })
     
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
