import React, {useState, useEffect} from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector} from 'react-redux'
import { Select, Switch, Tag, Modal} from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import null_img from '../../images/null_img.png'
import error_img from '../../images/Heavy_red__x_.png'
import { addTrack, listTrack, editTrack, deleteTrack } from '../../functions/track';
// import jwt_decode from 'jwt-decode'

const Addsong = () => {

    const {user} = useSelector((state) => ({...state}))
    const [tracks, setTracks] = useState([])
    const [values, setValues] = useState({})
    const initiateValue = {
        name: '',
        artist: '',
        track: '',
        genre: '',
        img: '',
        lyric: '',
        duration: 0,
    }

    //ดูว่าได้รับ url ของเพลงนั้นมาหรือเปล่า
    useEffect(() => {
        if (values.track) {
            const audio = new Audio(values.track)
            audio.onerror = () => {
                values.duration = 0
            }
            audio.oncanplay = () => {
                const duration = Math.floor(audio.duration)
                values.duration = duration
            }
        }
    },[values])

    useEffect(() => {
        tracks.length === 0 && listTrack()
        .then(res => {
            setTracks(res.data.payload)
        }) 
        .catch(err => {
            toast.error(err)
        })
    }, [tracks])

    const handleImageError = (e)=> {
        e.target.src = error_img
    }

    const handleChange = (e)=> {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    //add modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    //edit modal
    const [iseditModalVisible, setIseditModalVisible] = useState(false);

        const showModal = () => {
            setValues(initiateValue)
            setIsModalVisible(true);
        };
        const showModalEdit = (track) => {
            setValues(track)
            setIseditModalVisible(true);
        };

        //add ok
        const handleOk = () => {
            if(values.duration !== 0) {
                setIsModalVisible(false);
                addTrack(values, user.token)
                .then(res => {
                    toast.success("add success")
                    console.log(res.data.payload)
                    setTracks(res.data.payload)
                }) 
                .catch(err => {
                    toast.error(err)
                })
            } else {
                toast.error('Music URL is invalid')
            }
            
        };

        //edit ok
        const handleEditOk = () => {
            if(values.duration !== 0) {
                setIseditModalVisible(false);
                const id = {value: values._id}
                const body = values
                delete body._id
                delete body.favCount
                // console.log(id, body)
                editTrack(id.value, body, user.token)
                .then(res => {
                    toast.success("edit success")
                    console.log(res.data.payload)
                    setTracks(res.data.payload)
                }) 
                .catch(err => {
                    toast.error(err)
                })
            } else {
                toast.error('Music URL is invalid')
            }
            // editTrack(user.token, id)
            // .then(res => {
                
            // }) 
            // .catch(err => {
            //     toast.error(err)
            // })
        };

        const handleCancel = (type) => {
            type===0?setIsModalVisible(false):setIseditModalVisible(false)
        };

        const handleRemove = (id) => {
            if(window.confirm(`Are you sure to delete song`)){
                // console.log("delete " + id)
                deleteTrack(user.token, id)
                .then((res) => {
                    console.log(res);
                    setTracks(res.data.payload)
                })
                .catch((err) => {
                    console.log(err.response);
                })
            }
        } ;

    return (
        <div>
            <div className='container-fluid'>  
            <div className='row'>
                <div className='col-md-1'>
                    <MenubarAdmin />
                </div>
                <div className='col-md-11'>
                    <h1>Add song   <PlusCircleOutlined onClick={ () => showModal()}/></h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Song name</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tracks.map((track) => (
                                <tr>
                                    <th scope="row">{track.name}</th>
                                    <td>{track.artist}</td>
                                    <td>{track.genre}</td>
                                    <td>{track.duration}</td>
                                    <td>
                                        <DeleteOutlined onClick={() => handleRemove(track._id)}/> 
                                        <EditOutlined onClick={() => showModalEdit(track)}/>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* add */}
                    <Modal title="Add new song in database" visible={isModalVisible} onOk={handleOk} onCancel={() => handleCancel(0)}>
                        <div className='form-group'>
                            <p>Enter song name: </p>
                            <input className='form-control' type="text" name='name' value={values.name}  placeholder='Enter song name' onChange={handleChange}  />
                        </div>
                        <div className='form-group'>
                            <p>Enter artist name: </p>
                            <input className='form-control' type="text" name='artist' value={values.artist} placeholder='Enter artist name' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <p>Enter genre name: </p>
                            <input className='form-control' type="text" name='genre' value={values.genre} placeholder='Enter genre name' onChange={handleChange}  />
                        </div>
                        <br />
                        <div className='form-group'>
                        <p> Put your picture url link here</p>
                        <div style={{display: 'flex'}}>
                            <img 
                            height = {'75px'}
                            width = {'75px'}
                            style = {{marginRight: '10px'}}
                            src={values.img ? values.img : null_img}
                            onError={handleImageError}
                            />
                            <textarea className='form-control'
                                    type="text"
                                    name="img"
                                    placeholder="Enter track image URL"
                                    value={values.img}
                                    onChange={handleChange}
                            />
                        </div>
                        
                        <br />
                        
                            {/* <input className='form-control' type="text" name='name' /> */}
                        </div>
                        <div className='form-group'>
                            <p>Enter music url here: </p>
                            <input className='form-control' type="text" name='track' value={values.track} placeholder='Enter Track url' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <p>Enter lyric: </p>
                            <textarea className='form-control'
                                    type="text"
                                    name="lyric"
                                    placeholder="Enter lyric"
                                    value={values.lyric}
                                    onChange={handleChange}
                            />
                        </div>
                    </Modal>

                    {/* edit */}

                    <Modal title="Edit song in database" visible={iseditModalVisible} onOk={handleEditOk} onCancel={() => handleCancel(1)}>
                        <div className='form-group'>
                            <p>Enter song name: </p>
                            <input className='form-control' type="text" name='name' value={values.name}  placeholder='Enter song name' onChange={handleChange}  />
                        </div>
                        <div className='form-group'>
                            <p>Enter artist name: </p>
                            <input className='form-control' type="text" name='artist' value={values.artist} placeholder='Enter artist name' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <p>Enter genre name: </p>
                            <input className='form-control' type="text" name='genre' value={values.genre} placeholder='Enter genre name' onChange={handleChange}  />
                        </div>
                        <br />
                        <div className='form-group'>
                        <p> Put your picture url link here</p>
                        <div style={{display: 'flex'}}>
                            <img 
                                height = {'75px'}
                                width = {'75px'}
                                src={values.img ? values.img : null_img}
                                onError={handleImageError}
                            />
                            <textarea className='form-control'
                                    type="text"
                                    name="img"
                                    placeholder="Enter track image URL"
                                    value={values.img}
                                    onChange={handleChange}
                            />
                        </div>
                        
                        <br />
                        
                            {/* <input className='form-control' type="text" name='name' /> */}
                        </div>
                        <div className='form-group'>
                            <p>Enter music url here: </p>
                            <input className='form-control' type="text" name='track' value={values.track} placeholder='Enter Track url' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <p>Enter lyric: </p>
                            <textarea className='form-control'
                                    type="text"
                                    name="lyric"
                                    placeholder="Enter lyric"
                                    value={values.lyric}
                                    onChange={handleChange}
                            />
                        </div>
                    </Modal>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Addsong