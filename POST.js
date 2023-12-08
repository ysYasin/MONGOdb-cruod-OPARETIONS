// FRIst you should Read a add client on mongo
// then Read collection ---- wel thats not now our headech 

/* -------------------------------------------------------------------------- */
/*                       how to Read data on mogoDB                        */
/* -------------------------------------------------------------------------- */

//think we have a collection named === products  ===

// we can send on document and multiple document at qa time \\
/**
*first , insertOne
                products.findOne()
*/
/**
 * if we want to send multiple data at a time, Than
 *         products.find()
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

// Read a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // read the client to the server	(optional starting in v4.7)
        await client.connect();

        //READ database and collection
        const products = client.db("ProductsDB").collection("Products");

        app.get("/", (req, res) => {
            res.send("Hello MONGO !!")
        })
        app.post("/", async (req, res) => {
            await products.find()
        })

        app.post("/p", async (req, res) => {
            await products.findOne()
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally { }
}
run().catch(console.dir);

