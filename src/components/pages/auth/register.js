import React, {useState} from 'react'
import {register} from  '../../functions/auth' 
import { toast } from 'react-toastify'

import { GiFireworkRocket } from 'react-icons/gi'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    //setstate
    const navigate = useNavigate();
    const [value,setValue]  = useState({
                username:"",
                email:"",
                password:"",
                password_confirm: "",
            })
    
    // const [error, setError] = useState({})
    //get object value 
    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setValue({
            ...value,   //copy value
            [e.target.name]: e.target.value,    //เปลี่ยนค่าชื่อ attribute ไปเป็นค่าอะไร
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault ();    //not reload page
        console.log(value)

        // if(!value.username){
        //     setError({...error}, 'username was not given')
        // }

        // if(value.password !== value.password_confirm){
        //     setError({...error}, 'password not match')
            
        // }

        // if(Object.keys(error).length !== 0)  {
        //     toast.error(error[0]);
        // }
        // else{
            //function
            delete value.password_confirm
            register(value)
            .then(res => {
                console.log(res.data)
                toast.success(res.data)
                navigate('/login');
            }) 
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data)

            })
        // }
    }

    return (
        <div className='container p-5'>
            <Row style={{border: 'solid black 2px', borderRadius: '25px'}}>
                <Col style={{padding: '50px'}}>
                <div style={{display: 'flex'}}>
                    <GiFireworkRocket  style={{marginTop: '5px' , marginRight: '30px', fontSize: '40px'}} /> <h1 style={{color: 'green'}} >Register form</h1> </div>
                <form onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label>Username </label>
                        <input className='form-control' type="text" name="username" placeholder='username' onChange={handleChange} width='100%' />
                    </div>
                    
                    <div className='form-group'>
                        <label>Email </label>
                        <input className='form-control' type="text" name="email" placeholder='email' onChange={handleChange} width='100%'/>
                    </div>

                    <div className='form-group'>
                        <label>Password </label>
                        <input className='form-control' type="text" name="password" placeholder='password' onChange={handleChange} width='100%' />
                    </div>

                    <div className='form-group'>
                        <label>Comfirm your password </label>
                        <input className='form-control' type="text" name="password_confirm" placeholder='confirm-password' onChange={handleChange} width='100%'/>
                    </div>

                    <br />
                    <div style={{display: 'flex'}}>
                        <button className='btn btn-success' type="submit" disabled = {value.password.length < 6} >Create member</button>
                        <Link style={{textDecoration:"none", color: 'green', marginLeft: '10px'}} to='/login' > already have an account? click here </Link>
                    </div>
                </form>
                </Col> 

                <Col>
                <img src='https://api.time.com/wp-content/uploads/2020/11/best-songs-2020.jpg?quality=85&w=2400' style={{objectFit: 'fit', height: "500px", width: "800px", borderRadius: '25px'}}></img>
                </Col> 
            </Row>    
        </div>
    )
}

export default Register
