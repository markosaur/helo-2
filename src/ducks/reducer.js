const initialState = {
    id: 0,
    username: '',
    profile_pic: ''
}

//Action Consts
const UPDATE_USER = 'UPDATE_USER'

//Action Builders
//instead of having a const, try putting in a function since you are not passing in an object like in group grub project
export function updateUser(id, username, profile_pic){
    return {
        type: UPDATE_USER,
        payload: {id, username, profile_pic}
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_USER:
            return {...state, id : action.payload.id, username: action.payload.username, profile_pic: action.payload.profile_pic}
        default: return state
    }

}
export default reducer