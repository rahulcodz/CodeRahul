
import 'dotenv/config'
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri: string = process.env.DATABASE_URL || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Mongodb database connected!!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
