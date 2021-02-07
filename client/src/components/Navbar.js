import React,{useContext,useReducer} from 'react'
import {Link, useHistory } from 'react-router-dom'
import {UserContext} from '../App'
import {reducer,initialState} from '../reducers/userReducer'

const NavBar=()=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    const history=useHistory()
    const user=JSON.parse(localStorage.getItem("user"))
    
    const renderList=()=>{
      if(user){
        return(
          [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create">Create Post</Link></li>,
          <li><Link to="/signin">Signin</Link></li>
        ])
      }
      else{
        return[
          <li><Link to="/signup">Signup</Link></li>,
          <li><Link to="/signin">Signin</Link></li>
        ]
      }
    }
    return(
      <nav>
      <div className="nav-wrapper white">
        <Link to={user?"/":"/signin"} className="brand-logo left">VJTI</Link>

        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
            
    )
}


export default NavBar