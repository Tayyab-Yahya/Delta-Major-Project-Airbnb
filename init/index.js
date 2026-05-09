// const mongoose = require("mongoose");
// const initData = require("./data");
// const Listing = require("../models/listing");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(()=>{
//         console.log("connected to DB");
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner: '69e8e471f9d331c18c72c718'}));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// }

// initDB();

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB(); // <--- MOVE THIS HERE
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    // Map the owner ID to each listing
    const processedData = initData.data.map((obj) => ({
      ...obj, 
      owner: '69e8e471f9d331c18c72c718'
    }));
    
    await Listing.insertMany(processedData);
    console.log("Data was initialized successfully!");
  } catch (err) {
    console.log("Error initializing data:", err);
  }
};