const messages = document.querySelector('.messages')
window.addEventListener('load' , renderElemets)

setInterval(async()=>{
    await renderElemets()}, 4000);
async function renderElemets(){
    try{
        document.querySelector('.messages').innerHTML = ``
        // messages.innerHTML = ``
        if(!localStorage.getItem('token')){
            window.location = 'login.html'
        }
const p1 =  axios.get('http://localhost:4000/user/all-users' , {
    headers : {
        'auth-token' : localStorage.getItem('token')
    }
    
})
const p2 =  axios.get('http://localhost:4000/message/get-messages' , {
    headers : {
        'auth-token' : localStorage.getItem('token')
    }
    
})

const [res , messages ] = await Promise.all([p1,p2])
console.log(res)
console.log(messages)
const div = document.createElement('div')
div.textContent = 'You joined'
div.className = 'u-joined'
document.querySelector('.messages').appendChild(div)
res.data.users.forEach(user => {
    showUser(user)
})
const id = messages.data.id
messages.data.messages.forEach(message => {
    showMessage(message , id === message.userId)
})
    }catch(e){
        console.log(e)
    }
}

function showUser(user){
    const div = document.createElement('div')
    div.textContent = user.name +' joined'
    div.className = 'o-joined'
    messages.appendChild(div)
}

function showMessage(data , user){
    const div = document.createElement('div')
    if(user){
        div.className = 'u-message'
        div.textContent = "You: "+ data.message
    }else{
        div.className = 'o-message'
        div.textContent = data.user.name + ": "+ data.message

    }

    messages.appendChild(div)
}

document.forms[0].addEventListener('submit' , sendMessage)

async function sendMessage(e){
    try{
        e.preventDefault()
        const data = {message : e.target.message.value}
        const res = await axios.post('http://localhost:4000/message/add-message' , data , {
            headers : {
                'auth-token' : localStorage.getItem('token')
            }
        })
        console.log(res)
        showMessage(data , true)
        e.target.message.value =''
    }catch(e){
        console.log(e)
    }
}