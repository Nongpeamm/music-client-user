import React, {useState} from 'react'
import { login } from '../../functions/auth';

const Login = () => {
    
    const [value,setValue]  = useState({
        username:"",
        password:"",
    })

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
            //function
            login(value)
            .then(res => {
                console.log(res.data)
                alert(res.data)
            }) 
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data)
            })
    }

    return (
        <div>
            <h1>Login form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="username" placeholder='username' onChange={handleChange} />
                </div>

                <div>
                    <label>Password </label>
                    <input type="text" name="password" placeholder='password' onChange={handleChange} />
                </div>
            
                <div>
                    <button type="submit" >Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login