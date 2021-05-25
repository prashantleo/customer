import {ACTION_TYPES} from '../actions/STORES/Stores';

const initialState={
    list:[]
}

export const Store =(state=initialState,action)=>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL:
            return{ 
                ...state,
                list:[...action.payload]
            }


            case ACTION_TYPES.CREATE:
                return {
                    ...state,
                    list: [...state.list, action.payload]
                }
    
            case ACTION_TYPES.UPDATE:
                return {
                    ...state,
                    list: state.list.map(x => x.id == action.payload.storeId ? action.payload : x)
                }
    
            case ACTION_TYPES.DELETE:
                return {
                    ...state,
                    list: state.list.filter(x => x.storeId != action.payload)
                }
                
            default: return state;
        }
    }