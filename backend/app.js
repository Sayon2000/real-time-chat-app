const express = require('express')
const cors = require('cors')


require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors({
    origin : 'http://127.0.0.1:5500',
    methods : [' GET' ,'POST']
}))

const sequelize = require('./util/db')

const User = require('./models/User')
const Message = require('./models/Message')


User.hasMany(Message)
Message.belongsTo(User)

//routes

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')


app.use('/user' , userRoutes)
app.use('/message' , messageRoutes)


sequelize
// .sync({force : true})
.sync()
.then(()=>{

    app.listen(4000)
}).catch(e => {
    console.log(e)
})