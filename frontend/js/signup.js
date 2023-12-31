const form = document.forms[0]

form.addEventListener('submit' , async(e)=>{
    try{
        e.preventDefault()
        console.log(e.target.password)
        console.log(e.target['confirm-password'])
        if(e.target.password.value === e.target['confirm-password'].value){

        
        const data = {
            name : e.target.name.value,
            email : e.target.email.value,
            phone : e.target.phone.value,
            password : e.target.password.value
        }
        const res = await axios.post('http://3.27.133.80/user/create', data)
        console.log(res)
        if(res.status == 200){
            alert(res.data.msg)
            e.target.name.value = ''
            e.target.email.value = ''
            e.target.phone.value = ''
            e.target.password.value = ''
            e.target['confirm-password'].value = ''
            window.location = '/login.html'
        }

    }else{
        alert('confirm password and passwords does not match ')
    }
    }catch(e){
        console.log(e)
        alert(e.response.data.msg)
    }
})