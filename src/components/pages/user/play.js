import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'; 
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Play = () => {
    const dispatch = useDispatch();
    const { user, player } = useSelector((state) => ({...state}))
    const audioRef = useRef()

    useEffect(() => {
        !player && dispatch({
            type:"play",
            payload: {
                currentplayer: null
            }
        });
    }, [player])

    useEffect(() => {
        player && player.currentplayer && player.currentplayer.track && (player.setplay ? audioRef.current.play() : audioRef.current.pause())
    }, [player])
    
  return (
    <audio
                    src={player && player.currentplayer && player.currentplayer.track}
                    ref = {audioRef}            
                                onError={() =>
                                    toast.error('This track is not available at the moment.')
                                }
                    />
  )
}

export default Play