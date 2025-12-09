const express = require('express');
const connectdb = require("./config/db")
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const feedRoutes = require("./routes/feedRoutes")
const userRoutes = require("./routes/userRoutes")
const requestRoutes = require("./routes/requestRoutes")
const friendRoutes = require("./routes/friendRoutes")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
connectdb();

app.use(express.json());

app.use(cors({
    origin : 'http://localhost:5173',
     credentials: true,
}))


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

