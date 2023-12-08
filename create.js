// FRIst you should create a add client on mongo
// then create collection ---- wel thats not now our headech 

/* -------------------------------------------------------------------------- */
/*                       how to create data on mogoDB                        */
/* -------------------------------------------------------------------------- */

//think we have a collection named === products  ===

// we can send on document and multiple document at qa time \\
/**
*first , insertOne
                products.insertOne({
                    id: (we shoudn't create any ID MOGODB create _id by him self)
                    "prName":"sunglasses",
                    "price": "250",
                    "collor":"white",
                })
*/
/**
 * if we want to send multiple data at a time, Than
 *         products.insert([
               {
                   id: (we shoudn't create any ID MOGODB create _id by him self)
                   "prName":"sunglasses",
                   "price": "250",
                   "collor":"white",
               },
               {
                   id: (we shoudn't create any ID MOGODB create _id by him self)
                   "prName":"sunglasses",
                   "price": "250",
                   "collor":"white",
               },
])
 */

/* ------------------------------ let's do this ----------------------------- */
/** Set up express */
const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4320
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

// MongoDB CONNECT 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@cluster0.0gd1dng.mongodb.net/?retryWrites=true&w=majority`;

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

        //creating database and collection
        const products = client.db("ProductsDB").collection("Products");

        // IIFE fuction
        app.post("/", async (req, res) => {
            await products.insertMany([
                {
                    "prName": "sunglasses",
                    "price": "250",
                    "collor": "white",
                },
                {
                    "prName": "sunglasses",
                    "price": "250",
                    "collor": "black",
                },
            ])
            res.json({ success: 'M S' });
        })

        app.post("/p", async (req, res) => {
            await products.insertOne({
                "prName": "sunglasses",
                "price": "250",
                "collor": "white",
            })
            res.json({ success: 'O S' });
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally { }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello MONGO !!")
})