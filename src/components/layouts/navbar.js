import React from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

const items = [
    {
        label: (<Link to= "/"> 
            Home 
        </Link>),
        icon: <MailOutlined />,
    },
    {
        label: (<Link to= "/login"> 
            Login 
        </Link>),
        icon: <MailOutlined />,
    },

    {
        label: (<Link to= "/register"> 
            Register 
        </Link>),
        icon: <AppstoreOutlined />,
    },
    ];

const Navbar = () => {
    // const [current, setCurrent] = React.useState('mail');

    const onClick = (e) => {
    console.log('click ', e);
    // setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} mode="horizontal" items={items} />
        // selectedKeys={[current]}
    )
}

export default Navbar