const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://first-user:firstUser@cluster1.o3zed6g.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
