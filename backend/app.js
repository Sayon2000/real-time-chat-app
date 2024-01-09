const express = require('express')
const cors = require('cors')




require('dotenv').config()
const app = express()
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//     cors: ['http://localhost:5500']
// });
app.use(express.json())
app.use(cors({
    origin : 'http://127.0.0.1:5500',
    methods : [' GET' ,'POST']
}))


const sequelize = require('./util/db')

const User = require('./models/User')
const Message = require('./models/Message')
const Group = require('./models/Group')
const Member = require('./models/Member')
const cronJob = require('./util/cron')

// cronJob.start()



User.belongsToMany(Group , {through : Member})
Group.belongsToMany( User, {through : Member})

Group.hasMany(Message)
Message.belongsTo(Group)

Member.hasMany(Message)
Message.belongsTo(Member)
//routes

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const groupRoutes = require('./routes/groupRoutes')
const adminRoutes = require('./routes/adminRoutes')

const messagesRoutes = require('./routes/messagesRoutes')
// const {socketAuthenticate} = require('./middlewares/auth')


app.use('/user' , userRoutes)
app.use('/message' , messageRoutes)
app.use('/group' , groupRoutes)
app.use('/admin' , adminRoutes)


sequelize
// .sync({force : true})
.sync()
.then(()=>{
    // const connection = (socket)=>{
        
    //         socket.use(async(packet,next)=>{
    //             await socketAuthenticate(socket,next)

    //         })
        
    //     console.log(socket.id)
    //     messagesRoutes(io,socket)
    // }

    // io.on('connection' , connection)
    app.listen(4000)
}).catch(e => {
    console.log(e)
})