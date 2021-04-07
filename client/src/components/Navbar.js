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
            <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
              <li key="2"><Link to="/profile">Profile</Link></li>,
              <li key="3"><Link to="/create">Create Post</Link></li>,
              <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
              <li  key="5">
               <button className="btn #c62828 red darken-3"
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }}
              >
                  Logout
              </button>
              </li>
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
