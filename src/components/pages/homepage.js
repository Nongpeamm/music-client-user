import React from 'react'

const homepage = () => {
  return (
    <div style= {{width:'100%', height:'600px'}}>
      <img src='https://ak.picdn.net/shutterstock/videos/1019462221/thumb/1.jpg' style= {{width:'100%', height:'100%', opacity: '0.6'}}></img>
      <div style= {{position: 'absolute', top: '35%' , left: '50%', transform: 'translate(-50%, -50%)'}}>
        <h1 style={{color: 'black'}}>Welcome To BEAM-MUSIC</h1>
        <br/>
        <h2 style={{color: 'black'}}>The Old way to Listen music </h2>
        <br/>
        <a href="/login" className='btn btn-success'>Let Go Login</a>
        {/* <button className='btn btn-success' >Let Go Login</button> */}
        </div>
    </div>
  )
}

export default homepage