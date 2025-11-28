const express = require('express');
const connectdb = require("./config/db")
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes")
const userRoutes = require("./routes/userRoutes")
const requestRoutes = require("./routes/requestRoutes")
const friendRoutes = require("./routes/friendRoutes")
const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;
connectdb();

app.use(express.json());


app.get("/" , (req,res)  => {
   res.send("Hello World");
});

app.use("/api/auth", authRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/auth/user', userRoutes)
app.use('/api/request' , requestRoutes);
app.use('/api/friends' , friendRoutes)


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});

