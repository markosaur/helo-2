const initialState = {
    id: null,
    username: null,
    profile_pic: null
}

//Action Consts
const UPDATE_USER = 'UPDATE_USER'

//Action Builders
export const updateUser = (userObj) => {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, user: action.payload}
        default: return state
    }
}

export default reducer