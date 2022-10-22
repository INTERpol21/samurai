import {getAuthUserData} from './AuthReducer';
import {AppThunk, InferActionsTypes} from "../redux-store";


// const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

let initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>



const appReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {

        case 'SN/APP/INITIALIZED_SUCCESS':

            return {
                ...state,
                initialized: true

            }

        default:
            return state
    }


}


export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}


//Санки
//Залогинины мы или нет
export const initializeApp = (): AppThunk => async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())

        })
}


export default appReducer;
