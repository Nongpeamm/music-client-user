import React , {useState, useEffect} from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { listUser, changeStatus, changeRole, removeUser, resetPassword} from '../../functions/users'

import { useSelector, useDispatch} from 'react-redux'
import { Select, Switch, Tag, Modal} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const ManageAdmin = () => {

    const {user} = useSelector((state) => ({...state}))
    const [data, setdata] = useState([]);
    const [values, setValue] = useState({
        id: "",
        password: "",
    });

    useEffect(() => {
        loadData(user.token)
    }, [])

    const loadData = (authtoken)=> {
            listUser(authtoken)
            .then((res) => {
                setdata(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

        const showModal = (id) => {
            setIsModalVisible(true);
            setValue({...values, id: id})
        };
        const onChangepassword = (e) => {
            console.log(e.target.value)
            setValue({...values, [e.target.name]: e.target.value })
        }

        const handleOk = () => {
            setIsModalVisible(false);
            resetPassword(user.token, values.id, {values} )
            .then((res) => {
                loadData(user.token)
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };


    const handleonChange = (e, id) => {
        
        const value = {
            id: id,
            enabled: e,
        } 
        changeStatus(user.token, value)
        .then((res) => {
            loadData(user.token)
            console.log(res);
        })
        .catch((err) => {
            console.log(err.response);
        })
    } ;

    const handleRemove = (id, username) => {
        console.log(user)
        if(window.confirm(`Are you sure to delete ${username}`)){
            console.log("delete")
            removeUser(user.token, id)
            .then((res) => {
                loadData(user.token)
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
        }
    } ;

    const handleonChangeRole = (e, id) => {
        
        let values = {
            id: id,
            role: e,
        } 
        changeRole(user.token, values)
        .then((res) => {
            loadData(user.token)
            console.log(res);
        })
        .catch((err) => {
            console.log(err.response);
        })
    } ;

    const roleData = ['user','admin'];
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-1'>
                    <MenubarAdmin />
                </div>
                <div className='col-md-11'>
                    <h1>MANAGE ADMIN</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => (
                                <tr key={item._id}>
                                    <th scope="row">{item.username}</th>
                                    <td>{item.email}</td>
                                    <td>
                                    
                                    <Select style={{width: '100%'}}
                                    value = {item.role} 
                                    onChange = {(e) => handleonChangeRole(e, item._id)}>

                                        {roleData.map((item, index) => 
                                            <Select.Option 
                                                // defaultvalue = { item } 
                                                value = {item}
                                                key={ index }
                                            >

                                                {item === 'admin' 
                                                    ?   <Tag color='green'>{ item }</Tag>
                                                    :   <Tag color='red'>{ item }</Tag>
                                                }

                                            </Select.Option>
                                        )}

                                    </Select>
                                    </td>
                                    <td>
                                    <Switch checked = {item.enabled}  onChange={(e) => handleonChange(e, item._id)}/>
                                    </td>
                                    <td>
                                        <DeleteOutlined onClick={() => handleRemove(item._id, item.username)}/> 
                                        <EditOutlined onClick={() => showModal(item._id)}/>  
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>new password :</p>
                        <input type="text" name='password' onChange = {onChangepassword} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ManageAdmin