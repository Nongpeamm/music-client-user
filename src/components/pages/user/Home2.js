import React, {useState, useEffect, useRef} from 'react'
import MenubarUser  from '../../layouts/MenubarUser'
import { toast } from 'react-toastify'
import { listTrack, Favtrackupdate } from '../../functions/track'
import { searchTrack } from '../../functions/search'
import { Row, Col, Card} from 'react-bootstrap'
import style from './Home2.module.css'
import { GrPlay, GrFavorite, GrPause , GrSearch} from "react-icons/gr";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'; 

import { useDispatch } from 'react-redux'
import {GiLoveSong} from "react-icons/gi"

const Home = () => {
    const dispatch = useDispatch();
    const { user, player } = useSelector((state) => ({...state}))
    const [tracks, setTracks] = useState([])
    const [search, setSearch] = useState({})
    const [favClick, setfavClick] = useState(false)

    const [searchNull, setsearchNull] = useState(false)

    useEffect(() => {
        tracks.length === 0 && listTrack()
        .then(res => {
            setTracks(res.data.payload)
            console.log(res.data.payload)
        }) 
        .catch(err => {
            toast.error(err)
        })
    }, [tracks])
    
    const handleSearch =  ({currentTarget: input}) => {
        setSearch({})
        setsearchNull(false)
        if(input.value){
        setsearchNull(true)
        console.log(input.value)
        searchTrack(input.value)
        .then(res => {
            console.log(res.data)
            setSearch(res.data)
            // setTracks(res.data.payload)
        }) 
        .catch(err => {
            toast.error(err)
        })
        }
    }

    const handlefav = (id) => {
        setfavClick(true);
        //add fav in song
        Favtrackupdate(user.token, id)
        .then(res => {
            console.log(res.data.payload)
            setTracks(res.data.payload)
        }) 
        .catch(err => {
            toast.error(err)
        })
    }
    

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
                backgroundImage: 'linearGradient(90deg, rgba(57,227,15,1) 0%, rgba(0,255,206,1) 41%)' , height: '500px'}}/>
                    </div>
                    <div className='col-md-11' style={{background: 'rgb(34,193,195)',
                        backgroundImage: 'linearGradient(0deg, rgba(34,193,195,1) 0%, rgba(110,191,143,1) 27%, rgba(122,188,190,1) 38%, rgba(80,85,203,1) 60%, rgba(152,209,117,1) 73%, rgba(45,253,85,0.12788865546218486) 85%)'}}>
                        <div style={{backgroundColor: 'rgb(215, 219, 216)' , paddingTop: '10px', marginTop: '15px'}}>
                        <div style={{padding: '10px'}}>
                            <div style= {{display: 'flex' , marginTop: '20px' ,fontSize: '40px'}}>
                            <h1 style={{color : 'green', marginTop: ' 5px', marginRight:'10px'}}>Welcome back {user.username}</h1>
                            <GiLoveSong style={{color : 'green', marginTop: '10px'}}></GiLoveSong></div>
                        <br/>
                        <div class="input-group rounded" height = '10px' >
                        <div className="search">
                            <GrSearch />
                            <input style={{marginLeft: '10px'}} weight = '100%' type= 'text' placeholder="search song"  onChange={handleSearch} />
                            </div>
                        </div>
                        </div>
                        
                        <br />
                        </div>
                        <br/>
                        <Row>
                        {Object.keys(search).length !== 0 && search.tracks.length !== 0 ? (
                            
                        <Row>
                            <h1>Track - {search.tracks.length} song</h1>
                            {search.tracks.map((track) => (
                        
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <div className={`${style.box}`}>
                            <Card className= {`rounded ${style.img}` }>
                            <div className={ `${style.overlay}` }>
                                
                                    {/* <GrPlay
                                    onClick={() => handleplay(track)}
                                    className={`${style.overlayButton}`}
                                    style={{ fontSize: '35px', color: "white"}}
                                    /> */}
                                    {player && player.currentplayer && player.setplay && player.currentplayer._id === track._id ? <GrPause
                                            onClick={() => handleplay(track)}
                                            style={{ fontSize: '50px', color: "white"}}
                                        /> : <GrPlay
                                        onClick={() => handleplay(track)}
                                        style={{ fontSize: '50px', color: "white"}}
                                    />   } 
                                
                                <GrFavorite 
                                    onClick={() => handlefav(track._id)}
                                className={`${style.overlayButton}`}
                                style={{ fontSize: '50px', marginLeft: '10px', color: "white"}}
                                />
                            </div>
                            <Card.Img src={track.img} />
                            </Card >
                            <Link to={`/user/listen/${track._id}`} style={{textDecoration:"none" }}>
                            <Card.Body style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                            {/* <Card.Img src={track.img} /> */}
                            <Card.Title style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                                
                                <p>{track.name}</p>
                                <div style={{display: 'flex'}}>
                                    <p>{track.artist}</p>
                                    <p style={{marginLeft: '10px'}}> fav: {track.favCount}</p>
                                </div>
                                
                            </Card.Title>
                            </Card.Body>
                            </Link>
                            </div>
                        </Col>))}
                        <br/>
                        </Row>

                        
                        ) :  searchNull && (<div><h1>NO tracks found</h1></div>)}
                        <br / >
                        {/* style={{display: 'block'}} */}

                        {Object.keys(search).length !== 0 && search.artist.length !== 0 ? (
                        
                        <Row>
                            <h1>Artist - {search.artist.length} song</h1>
                            {search.artist.map((track) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <div className={`${style.box}`}>
                            <Card className= {`rounded ${style.img}` }>
                            <div className={ `${style.overlay}` }>
                                
                                    {/* <GrPlay
                                    onClick={() => handleplay(track)}
                                    className={`${style.overlayButton}`}
                                    style={{ fontSize: '35px', color: "white"}}
                                    /> */}
                                    {player && player.currentplayer && player.setplay && player.currentplayer._id === track._id ? <GrPause
                                            onClick={() => handleplay(track)}
                                            style={{ fontSize: '50px', color: "white"}}
                                        />
                                         : <GrPlay
                                        onClick={() => handleplay(track)}
                                        style={{ fontSize: '50px', color: "white"}}
                                    />   } 
                                
                                <GrFavorite 
                                onClick={() => handlefav(track._id)}
                                className={`${style.overlayButton}`}
                                style={{ fontSize: '50px', marginLeft: '10px', color: "white"}}
                                />
                            </div>

                            <Card.Img src={track.img} />

                            </Card>
                            <Link to={`/user/listen/${track._id}`} style={{textDecoration:"none"}}>
                            <Card.Body style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                            {/* <Card.Img src={track.img} /> */}
                            <Card.Title style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                                <p>{track.name}</p>
                                <div style={{display: 'flex'}}>
                                    <p>{track.artist}</p>
                                    <p style={{marginLeft: '10px'}}> fav: {track.favCount}</p>
                                </div>
                            </Card.Title>
                            </Card.Body>
                            </Link>
                            </div>
                            <br/>
                        </Col>))}
                        </Row>
                        
                        ): searchNull && (<div
                                ><div>
                                    <h1>NO artist found</h1>
                                </div>
                                </div>)} 

                        {Object.keys(search).length === 0 && (tracks.map((track) => (
                            
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <div className={`${style.box}`}>
                            <Card className= {`rounded ${style.img}` }>
                            <div className={ `${style.overlay}` }>
                                
                                    {/* <GrPlay
                                    onClick={() => handleplay(track)}
                                    className={`${style.overlayButton}`}
                                    style={{ fontSize: '35px', color: "white"}}
                                    /> */}
                                    {player && player.currentplayer && player.setplay && player.currentplayer._id === track._id ? <GrPause
                                            onClick={() => handleplay(track)}
                                            style={{ fontSize: '50px', color: "white"}}
                                        /> : <GrPlay
                                        onClick={() => handleplay(track)}
                                        style={{ fontSize: '50px', color: "white"}}
                                    />   } 
                                
                                <GrFavorite 
                                onClick={() => handlefav(track._id)}
                                className={`${style.overlayButton}`}
                                style={{ fontSize: '50px', marginLeft: '10px', color: "white"}}
                                />
                            </div>

                            <Card.Img src={track.img} />

                            </Card>
                            <Link to={`/user/listen/${track._id}`} style={{textDecoration:"none"}}>
                            <Card.Body style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                            {/* <Card.Img src={track.img}/> */}
                            <Card.Title style={{backgroundColor: 'rgb(215, 219, 216)'}}>
                            
                                <p>{track.name}</p>
                                <div style={{display: 'flex'}}>
                                    <p>{track.artist}</p>
                                    <p style={{marginLeft: '10px'}}> fav: {track.favCount}</p>
                                </div>
                            
                            </Card.Title>
                            </Card.Body>
                            </Link>
                            </div>
                            <br/>
                        </Col>)
                        
                        ))}

                        </Row>
                        
                    </div>
                </div>
            </div>
    )
}

export default Home