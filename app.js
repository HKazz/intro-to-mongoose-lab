const prompt = require("prompt-sync")();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const cust = mongoose.model("Cust", customerSchema);

module.exports = cust;

// -----------------------------------------------------------------------
const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

async function promptUser() {
  const username = prompt("What is your name?");
  console.log(`Your name is ${username}`);

  prompt(`What would you like to do, ${username}?
  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
  Number of action to run:`)
}

const runQueries = async () => {
  console.log("Queries running.");
  await promptUser()
};

connect();
