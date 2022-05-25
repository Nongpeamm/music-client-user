import React, {useState, useEffect, useRef} from 'react'
import MenubarUser  from '../../layouts/MenubarUser'
import { toast } from 'react-toastify'
import { Row, Col,Card,} from 'react-bootstrap'
import style from './userProfile.module.css'
import { GrPlay, GrFavorite, GrFormPrevious, GrPause} from "react-icons/gr";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import { useDispatch } from 'react-redux'
import { getUser } from '../../functions/users'

const UserProfile = () => {
    const { user, player} = useSelector((state) => ({...state}))
    const [profile, setProfile] = useState({})
    const [tracks, setTrack] = useState([])
    const dispatch = useDispatch();

    // console.log(user)
    useEffect(() => {
        user  && getUser(user.token)
        .then(res => {
            // console.log(res.data)
            setProfile(res.data.user)
            setTrack(res.data.song)
            
        }) 
        .catch(err => {
            toast.error(err)
        })
    }, [user])

    // useEffect(() => {
        
    // }, [user])

    // useEffect(() => {
    //     profile  && console.log(profile)
    // }, [profile])

    const handleplay = (track) => {
        if(player && player.currentplayer && player.setplay && player.currentplayer._id === track._id){
            dispatch({
                type:"play",
                payload: {
                    currentplayer: track,
                    setplay: false
                }
            });
            toast("Now pause " + player.currentplayer.name)
        }
        else{
            dispatch({
            type:"play",
            payload: {
                currentplayer: track,
                setplay: true
            }
        });
        toast("Now playing " + player.currentplayer.name)
        }
    }

    tracks.length !== 0  && console.log(tracks)

    // console.log(profile.favourite)

  return (
    <div className='container-fluid'>
    <div className='row' >
        <div className='col-md-1' >
          {/* style={{background: 'rgb(117,209,195)',
      backgroundImage: 'linearGradient(0deg, rgba(117,209,195,1) 25%, rgba(49,162,70,1) 91%)' ,height:'100%'}} */}
        <MenubarUser />
        </div>
        <div className='col-md-11 '>
            <div style={{background: 'rgb(57,227,15)',
                backgroundImage: 'linearGradient(90deg, rgba(57,227,15,1) 0%, rgba(0,255,206,1) 41%)' , height: '500px'}} >
                <div style= {{ backgroundColor: 'rgb(215, 219, 216)'}} >
                    <Link to={`/user/home`} style={{textDecoration:"none"}}>
                    <div style= {{ display: ' flex'}}>
                    <GrFormPrevious 
                    style={{ fontSize: '50px', color: "white"}}/>
                    <h3 style= {{marginTop: '9px', marginLeft: '10px'}}>Back</h3></div>
                    </Link>
                </div>
                <div style= {{display: ' flex'}}>
                    <img src= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" style= {{marginTop: '50px', marginLeft: '100px' , border: 'solid 5px black'}} height = '350px' weight = '350px'></img>
                    <div className= {`${style.textBox}`} style= {{marginTop: '90px', marginLeft: '50px' }}>
                        <h2 className= {`${style.textInfo}`}><strong>USERNAME:</strong> {profile.username} </h2>
                        <br />
                        <h2 className= {`${style.textInfo}`}><strong>EMAIL:</strong> {profile.email} </h2>
                    </div>
                    
                    
                   

                </div>
                <br/>
                <br/>
                <br/>
                 <Row>
                        <h1>Favourite</h1>
                        {tracks.length !== 0 && tracks.map((track) =>
                            // sm={12} md={6} lg={4} xl={3}
                            (<Col sm={12} md={6} lg={4} xl={3}>
                                <Card className= {`rounded ${style.img}` }>
                            <div className={ `${style.overlay}` }>
                                
                                    {player && player.currentplayer && player.setplay && player.currentplayer._id === track._id ? <GrPause
                                            onClick={() => handleplay(track)}
                                            style={{ fontSize: '50px', color: "white"}}
                                        /> : <GrPlay
                                        onClick={() => handleplay(track)}
                                        style={{ fontSize: '50px', color: "white"}}
                                    />   } 
                                
                                <GrFavorite 
                                    // onClick={() => handlefav(track._id)}
                                className={`${style.overlayButton}`}
                                style={{ fontSize: '35px', marginLeft: '10px', color: "white"}}
                                />
                            </div>
                            <Card.Img src={track.img} />
                            </Card>
                            <Link to={`/user/listen/${track._id}`} style={{textDecoration:"none"}}>
                            <Card.Body>
                            {/* <Card.Img src={track.img} /> */}
                            <Card.Title>
                                
                                <p>{track.name}</p>
                                <div style={{display: 'flex'}}>
                                    <p>{track.artist}</p>
                                </div>
                                
                            </Card.Title>
                            </Card.Body>
                            </Link>
                            </Col>)
                        )}
                    </Row>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserProfile