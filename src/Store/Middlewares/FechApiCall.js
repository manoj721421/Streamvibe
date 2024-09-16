
export const fetchApiCall=({dispatch})=>(next)=>(action)=>{
    if(action.type === "api/makeApiCall")
    {
        next(action);
        const {endpoint, onStart, onSuccess,onError} = action.payload
        let url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`;
        dispatch({
            type:onStart
        });
        fetch(url)
        .then((res)=>res.Json())
        .then((data)=>{
            dispatch({
                type:onSuccess,
                payload:data
            })
        })
        .catch((ex)=>{dispatch({
            type:onError,
            payload:ex.message
        })})
    }else{
        next(action);
    }
}