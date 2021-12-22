const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const blogs = require('./routes/blogs')


//configure express app and connect to mongodb
dotenv.config()
const app = express()
const myDb = process.env.MONGO_URI
app.use(express.urlencoded({extended: true}))
app.use(cors())
mongoose.connect(myDb,{ useNewUrlParser: true, useUnifiedTopology: true })



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/blogs', blogs)







app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));