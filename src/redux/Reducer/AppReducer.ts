import {getAuthUserData} from './AuthReducer';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"


export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};


const appReducer = (state = initialState, action: any): InitialStateType => {


    switch (action.type) {

        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true

            }

        default:
            return state
    }


}

type InitializeSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializeSuccessActionType => ({type: INITIALIZED_SUCCESS})
//Санки
//Залогинины мы или нет
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())

        })
}


export default appReducer;
