import React from 'react'
import { Link } from 'react-router-dom'
import { SiYoutubemusic } from 'react-icons/si'
import { RiProfileLine } from 'react-icons/ri'

const MenubarUser = () => {
  return (
    
    <nav className='navigation' >
        <ul className="nav flex-column" style={{marginTop : '10px'}}>
            <li className='nav-item' style={{border : 'solid 1px black'}}>
              <div style= {{display: 'flex' , paddingLeft:'9px', paddingRight:'9px' ,paddingTop: '4px', paddingBottom: '2px'}}>
                <SiYoutubemusic style={{fontSize:'30px', marginTop: '5px'}}/>
                <Link to="/user/home" style={{textDecoration:"none"}}><h3>Home</h3></Link>
              </div>
                
            </li>
            <li className='nav-item' style={{border : 'solid 1px black'}}>
            <div style= {{display: 'flex' , paddingLeft:'9px', paddingRight:'9px' ,paddingTop: '4px', paddingBottom: '2px'}}>
                <RiProfileLine style={{fontSize:'30px' , marginTop: '5px'}} />
                <Link to="/user/profile" style={{textDecoration:"none"}}><h3>Profile</h3></Link>
              </div>

            </li>
        </ul>
    </nav>
  )
}

export default MenubarUser