import React from 'react'
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined,LoginOutlined,LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"    //ส่งไปหน้าต่างๆ
import { useDispatch,useSelector } from 'react-redux';  //เตลียร์ store

const Navbar = () => {
    // const [current, setCurrent] = React.useState('mail');
    const dispatch = useDispatch();
    const { user } = useSelector( (state) => ({...state}))
    const navigate = useNavigate();
    const logout = () => {
        dispatch({
            type: "Logout",
            payload: null, //clear user payload
        })
        navigate("/"); //redirect to homepage
    };

    const { SubMenu } = Menu;

    return (
        <Menu mode="horizontal" style={{background: 'rgb(25,217,120)', 
          backgroundImage: 'linearGradient(90deg, rgba(25,217,120,0.09707633053221287) 0%, rgba(9,121,12,0.3575805322128851) 81%)'}}>
            
      {user && (
        <>
          {/* {user.username} */}
          <Menu.Item key="home" icon={<HomeOutlined />}>
                BEAM-MUSIC
          </Menu.Item>
          <SubMenu
            style={{ float: "right" }}
            key="SubMenu"
            icon={<DownOutlined />}
            title={user.username}
          >
            <Menu.Item 
            icon={<LogoutOutlined />}
            key="setting:1" onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>

        </>
      )}

      {!user && (
        <>
        <Menu.Item key="home" icon={<HomeOutlined />}>
                {/* <a href="" ></a>*/}
                <Link to="/" style={{textDecoration:"none" }} >Home</Link>
            </Menu.Item>
          <Menu.Item
            key="mail"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            {/* <a href="" ></a>*/}
            <Link to="/login" style={{textDecoration:"none" }}>Login</Link>
          </Menu.Item>

          <Menu.Item
            style={{ float: "right" }}
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register" style={{textDecoration:"none" }}>Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
    )
}

export default Navbar