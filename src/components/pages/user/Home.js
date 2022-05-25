// import React, {useState, useEffect} from 'react'
// import MenubarUser  from '../../layouts/MenubarUser'
// import { toast } from 'react-toastify'
// import { listTrack } from '../../functions/track'
// import { searchTrack } from '../../functions/search'
// import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'

// const Home = () => {
//   const [tracks, setTracks] = useState([])
//   const [search, setSearch] = useState({})
//   const [searchNull, setsearchNull] = useState(false)
//   // const [search, setsearch] = useState() 

//   useEffect(() => {
//     tracks.length === 0 && listTrack()
//     .then(res => {
//         setTracks(res.data.payload)
//         console.log(res.data.payload)
//     }) 
//     .catch(err => {
//         toast.error(err)
//     })
// }, [tracks])

//   const handleSearch =  ({currentTarget: input}) => {

//     setSearch({})
//     setsearchNull(false)
//     if(input.value){
//       setsearchNull(true)
//       console.log(input.value)
//       searchTrack(input.value)
//       .then(res => {
//           console.log(res.data)
//           setSearch(res.data)
//       }) 
//       .catch(err => {
//         toast.error(err)
//       })
//     }
//   }

//   return (
//     <div className='container-fluid'>
//             <div className='row'>
//                 <div className='col-md-2'>
//                   <MenubarUser />
//                 </div>
//                 <div className='col'>
//                     <div>
//                       <h1>Welcome back</h1> 
//                       <div class="input-group rounded" height = '10px' >
//                       <div className="search">
//                           <input weight = '100%' type= 'text' placeholder="search song"  onChange={handleSearch} />
//                         </div>
//                       </div>
//                       <br />
//                     </div>
//                     <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
//                     {Object.keys(search).length !== 0 && search.tracks.length !== 0 ? (
//                       <div>
//                         <h1>Track</h1>
//                         {search.tracks.map((track) => (
                      
//                       <div class="col">
//                         <div class="card shadow-sm">
//                         <img src={track.img} height={'150px'} weight={'150px'}></img>
//                         <div >
//                           <div class="card-body">
//                             <p class="card-text">{track.name}</p>
//                             <p class="card-text">{track.artist}</p>
//                           </div>
//                         </div>
//                         </div>
//                       </div>))}
//                       </div>
                      
//                       ) :  searchNull && (<div>NO tracks found</div>)}
//                       <br / >
//                       {/* style={{display: 'block'}} */}

//                       {Object.keys(search).length !== 0 && search.artist.length !== 0 ? (
                      
//                       <div class="row">
//                         <h1>Artist</h1>
//                         {search.artist.map((track) => (
//                       <div class="col">
//                         <div class="card shadow-sm">
//                         <img src={track.img} height={'150px'} weight={'150px'}></img>
//                           <div class="card-body">
//                             <p class="card-text">{track.name}</p>
//                             <p class="card-text">{track.artist}</p>
//                           </div>
//                         </div>
//                       </div>))}
//                       </div>
                      
//                       ): searchNull && (<div
//                               ><div>
//                                 NO artist found
//                               </div>
//                             </div>)} 

//                     {Object.keys(search).length === 0 && (tracks.map((track) => (
//                       <div class="col">
//                         <div class="card shadow-sm">
//                         <img src={track.img} height={'150px'} weight={'150px'}></img>
//                           <div class="card-body">
//                             <p class="card-text">{track.name}</p>
//                             <p class="card-text">{track.artist}</p>
//                           </div>
//                         </div>
//                       </div>)
//                       ))}

//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default Home