import React from 'react'
import { Link } from 'react-router-dom'
import { MdManageAccounts } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'

const MenubarAdmin = () => {
  return (
    <nav>
        <ul className="nav flex-column" style={{marginTop : '10px'}}>
            <li className='nav-item' style={{border : 'solid 1px black'}}>
              <div style= {{display: 'flex' , paddingLeft:'9px', paddingRight:'9px' ,paddingTop: '4px', paddingBottom: '2px'}}>
                <MdManageAccounts style={{fontSize:'30px', marginTop: '5px'}} />
                <Link to="/admin/manage-admin" style={{textDecoration:"none"}}><h3>User-manage</h3></Link></div>
            </li>
            <li className='nav-item' style={{border : 'solid 1px black'}}>
              <div style= {{display: 'flex' , paddingLeft:'9px', paddingRight:'9px' ,paddingTop: '4px', paddingBottom: '2px'}}>
                <RiAddCircleFill style={{fontSize:'30px', marginTop: '5px'}} />
                <Link to="/admin/song-admin" style={{textDecoration:"none"}}><h3>Song-manage</h3></Link></div>
            </li>
        </ul>
    </nav>
  )
}

export default MenubarAdmin