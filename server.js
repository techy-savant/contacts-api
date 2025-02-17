const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());

//Routes
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Error Handler - Must be after all routes
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
