export const initialState = null;

export const reducer = (state = initialState,action)=>{
    if(action.type==="USER"){
        return action.payload;
    }
    if(action.type=="CLEAR"){
        return (state=null);
    }
    if(action.type=="UPDATE"){
        return {
            ...state
            // followers:action.payload.followers,
            // following:action.payload.following
        }
    }
    if(action.type=="UPDATEPIC"){
        return {
            ...state,
            pic:action.payload
        }
    }
    console.log(state)
    return state;
} 