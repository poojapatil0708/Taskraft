import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null
}

export const userReducer = createSlice ({
    name : 'user',
    initialState,
    reducers: {
        addUser : (state, action) => {
            state.user = action.payload
        },
        removeUser : (state) => {
            state.user = null;
        }
    }
})

export const { addUser, removeUser} = userReducer.actions

export default userReducer.reducer