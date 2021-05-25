import api from "./api"

export const ACTION_TYPES={
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}
const formateData = data => ({
    ...data,
    
})
 export const  fetchALL =()=>dispatch =>
 {
     api.CUSTOMER().fetchAll()
     .then(
         response=>{
             console.log(response)
            dispatch({
                type:ACTION_TYPES.FETCH_ALL,
                payload:response.data
            })
         }
     )
     //get api req
     .catch(err=>console.log(err))
     
 }
 export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.CUSTOMER().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.CUSTOMER().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.CUSTOMER().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
    