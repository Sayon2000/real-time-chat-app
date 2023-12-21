const express = require('express')
const cors = require('cors')


require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

const sequelize = require('./util/db')

//routes

const userRoutes = require('./routes/userRoutes')


app.use('/user' , userRoutes)


sequelize
.sync()
.then(()=>{

    app.listen(4000)
}).catch(e => {
    console.log(e)
})