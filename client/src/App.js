import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Switch,Route,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import UserProfile from './components/screens/UserProfile'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
export const UserContext=createContext()


const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  // console.log(state)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      //dispatch({type:"USER",payload:user})
      history.push('/')
    }
    else{
      history.push('/signin')
    }

  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={state,dispatch}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App