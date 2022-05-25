
import React, {useState} from 'react'
import style from './login.module.css'
import { BiHappyHeartEyes } from 'react-icons/bi'

//function
import { login } from '../../functions/auth';

//redux 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value,setValue]  = useState({
        username:"",
        password:"",
    });

    const roleBaseRedirect = (role) => {
        if(role === 'admin'){
            navigate('/admin/manage-admin');
        }
        else{
            navigate('/user/home');
        }
    };

    const handleChange = (e) => {
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
                toast.success(res.data.payload.user.username + " Login success")
                dispatch({
                    type:"Login",
                    payload: {
                        token: res.data.token,
                        username: res.data.payload.user.username,
                        role: res.data.payload.user.role,
                    }
                });
                //เก็บ token เข้า application 
                localStorage.setItem('token', res.data.token);
                roleBaseRedirect(res.data.payload.user.role);
            }) 
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data)
            })
    }

    return (
        
        <div className='container p-5'>
            <Row style={{border: 'solid black 2px', borderRadius: '25px'}}>
                <Col style={{padding: '50px'}}>
                <div style={{display: 'flex'}}>
                    <BiHappyHeartEyes  style={{marginTop: '5px' , marginRight: '30px', fontSize: '50px', }} /> <h1 style= {{color: 'green'}}>Login form</h1> </div>
                    
                    
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Username </label>
                            <input className='form-control' type="text" name="username" placeholder='username' onChange={handleChange} />
                        </div>

                        <div className='form-group'>
                            <label>Password </label>
                            <input className='form-control' type="password" name="password" placeholder='password' onChange={handleChange} />
                        </div>

                        <br />
                        <div style={{display: 'flex'}} >
                            <button className='btn btn-success' type="submit" >Login</button>
                            <Link style={{textDecoration:"none", color: 'green', marginLeft: '10px'}} to='/register' > don't have an account? register now </Link>
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

export default Login