import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  console.log( "connection from dbConnect: " ,connection);

  if (connection?.isConnected) {
    console.log("Already connected to database");
    return;
  }

  if (mongoose?.connection?.readyState === 1) {
    connection.isConnected = mongoose?.connection?.readyState;
    console.log("Using existing connection to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "blood_bridge",
      serverSelectionTimeoutMS: 5000,
    });
    connection.isConnected = db?.connections[0]?.readyState;
    console.log(
      "Connection state mongoose",
      mongoose.connection.readyState,
      mongoose.connection._readyState
    );
    console.log("Connection state db", db.connections[0]._readyState, db.connections[0].readyState);
    console.log("Connected to database");
    console.log("connection from dbConnect: " ,connection);
    
    
  } catch (error) {
    console.log("Database connection failed", error);
    connection.isConnected = false;
    process.exit(1);
  }
}

export default dbConnect;
