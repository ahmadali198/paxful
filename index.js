const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace <db_password> with your actual password and <your-database> with the database you want to connect to.
const uri = "mongodb+srv://Aliahmad:Alisheikh@mycluster.lwdo4.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=Mycluster"; // Replace `myDatabaseName` with your actual database name

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
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Use your database
    const database = client.db('myDatabaseName');  // Use the appropriate database name
    const collection = database.collection('users');  // Use the appropriate collection name

    // Example: Insert a new user into the 'users' collection
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    const result = await collection.insertOne(newUser);
    console.log(`New user inserted with ID: ${result.insertedId}`);

    // Example: Find a user by email
    const user = await collection.findOne({ email: 'john@example.com' });
    console.log('Found user:', user);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Ensure the client will close after the operation is done
    await client.close();
  }
}

// Run the function
run().catch(console.dir);
