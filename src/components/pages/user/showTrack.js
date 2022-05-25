import React, {useState, useEffect, useRef} from 'react'
import MenubarUser  from '../../layouts/MenubarUser'
import { toast } from 'react-toastify'
import { listTrack, getTrack } from '../../functions/track'
// import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import style from './showTrack.module.css'
import { GrPlay, GrFavorite, GrFormPrevious, GrPause } from "react-icons/gr";
import { Link , useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'; 
import { useDispatch } from 'react-redux'

const ShowTrack = () => {
    const dispatch = useDispatch();
    const { user, player } = useSelector((state) => ({...state}))
    const [tracks, setTracks] = useState([])
    const audioRef = useRef()
    const { id } = useParams();


    useEffect(() => {
        id  && getTrack(id)
        .then(res => {
            setTracks(res.data.payload)
            // console.log(res.data.payload)
        }) 
        .catch(err => {
            toast.error(err)
        })
    }, [id])

    console.log(tracks)

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

  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-1'>
        <MenubarUser style={{background: 'rgb(57,227,15)',
                backgroundImage: 'linearGradient(90deg, rgba(57,227,15,1) 0%, rgba(0,255,206,1) 41%)' }}/>
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
                    <img src= {tracks.img} style= {{marginTop: '25px', marginLeft: '100px' , marginDown: '60px', border: 'solid 5px black'}} height = '350px' weight = '350px'></img>

                    <div className= {`${style.textBox}`} >
                        <h2 className= {`${style.textInfo}`}><strong>SONG:</strong> {tracks.name}</h2>
                        <br />
                        <h2 className= {`${style.textInfo}`}><strong>ARTIST:</strong> {tracks.artist}</h2>
                        <br/>
                        <h2 className= {`${style.textInfo}`}><strong>GENRE:</strong> {tracks.genre}</h2>
                        <br/>
                        {player && player.currentplayer && player.setplay && player.currentplayer._id === tracks._id ? <GrPause
                            onClick={() => handleplay(tracks)}
                            style={{ fontSize: '50px', color: "white"}}
                        /> : <GrPlay
                        onClick={() => handleplay(tracks)}
                        style={{ fontSize: '50px', color: "white"}}
                    />   } 
                        <GrFavorite 
                            // onClick={() => handlefav(tracks._id)}
                            style={{ fontSize: '50px', marginLeft: '10px', color: "white"}}
                        />
                    </div>
                    

                </div>
                <br/>
                <div style={{backgroundColor: 'rgb(147, 207, 203)', textAlign: 'center'}}>
                        {tracks.length !== 0 &&
                        <div style={{height:"500px", width:"100%", overflow:"scroll", border:"9px solid #0ADA0A"} }>
                        <h2 style={{marginTop: '10px'}}><strong>Lyrics</strong></h2>
                        <br/>
                        <div dangerouslySetInnerHTML={{
                                    __html:tracks.lyric.replace(
                                        new RegExp('\u000a', 'g'),
                                        '<br><br>',
                                    ),
                                }}>
                        </div>
                        </div>}

                    
                </div>
            </div>
        </div>
    </div>
        {/* <audio
            src={player && player.currentplayer && player.currentplayer.track}
            ref = {audioRef}            
                        onError={() =>
                            toast.error('This track is not available at the moment.')
                        }
        /> */}
    </div>
    )
}

export default ShowTrack