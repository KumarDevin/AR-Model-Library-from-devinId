const mongoose = require("mongoose");

async function connectMongodb(uri) {
  return mongoose
    .connect(uri)
    .then(() => console.log("mongodb connected ...."))
    .catch((err) => console.log(`error : ${err}`));
}

module.exports = { connectMongodb };
