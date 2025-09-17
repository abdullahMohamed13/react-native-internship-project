import { createSlice } from '@reduxjs/toolkit'

interface UserProps {
    email: string
    password: string
    gender: 'Male' | 'Female' | null
    fullname?: string
    phoneNumber?: string
}

const initialState: UserProps = {
    email: '',
    password: '',
    gender: null,
    fullname: '',
    phoneNumber: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // Setters
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setGender: (state, action) => {
            state.gender = action.payload
        },
        setFullname: (state, action) => {
            state.fullname = action.payload
        },
        setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload
        },
    }
})

export const { setEmail, setPassword,setGender, setFullname, setPhoneNumber } = userSlice.actions;
export default userSlice.reducer;
