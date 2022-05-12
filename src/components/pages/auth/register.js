import React, {useState} from 'react'
import {register} from  '../../functions/auth' 

const Register = () => {
    //setstate
    const [value,setValue]  = useState({
                username:"",
                email:"",
                password:"",
                password_confirm: "",
            })
    
    //get object value 
    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault ();    //not reload page
        console.log(value)

        if(value.password !== value.password_confirm){
            alert("password not match");
        }
        else{
            //function
            register(value)
            .then(res => {
                console.log(res.data)
                alert(res.data)
            }) 
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data)

            })
        }
    }

    return (
        <div>
            <h1>Hello New member</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Username </label>
                    <input type="text" name="username" placeholder='username' onChange={handleChange} />
                </div>
                
                <div>
                    <label>Email </label>
                    <input type="text" name="email" placeholder='email' onChange={handleChange}/>
                </div>

                <div>
                    <label>Password </label>
                    <input type="text" name="password" placeholder='password' onChange={handleChange}/>
                </div>

                <div>
                    <label>Comfirm your password </label>
                    <input type="text" name="password_confirm" placeholder='confirm-password' onChange={handleChange}/>
                </div>

                <div>
                    <button type="submit" disabled = {value.password.length < 6} >Create member</button>
                </div>
            </form>
        </div>
    )
}

export default Register
