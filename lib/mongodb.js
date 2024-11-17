// import { MongoClient } from 'mongodb';

// const client = new MongoClient(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let clientPromise;

// if (process.env.NODE_ENV === 'development') {
//   // In development, use a global variable to avoid repeated connections
//   if (global._mongoClientPromise) {
//     clientPromise = global._mongoClientPromise;
//   } else {
//     global._mongoClientPromise = client.connect();
//     clientPromise = global._mongoClientPromise;
//   }
// } else {
//   // In production, it's safe to just use the client promise directly
//   clientPromise = client.connect();
// }

// export default clientPromise;



// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this environment variable is set
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so it can be reused
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, don't use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
