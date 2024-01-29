import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        users:{
            allUsers:null,
            isFetching: false,
            error:false
        },
        user:{
            userr:null,
            isFetching: false,
            error:false
        },
        msg: "",
        
    },
    reducers:{
        getUsersStart: (state) =>{
            state.users.isFetching = true;
            state.msg = "";
        },
        getUsersSuccess: (state,action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getUsersFailed: (state) =>{
            state.users.isFetching = false;
            state.users.error = true;
        },

       deleteUserStart: (state) =>{
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state,action) => {
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state) =>{
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        getUserStart: (state) =>{
            state.user.isFetching = true;
        },
        getUserSuccess: (state,action) => {
            state.user.isFetching = false;
            state.user.userr = action.payload;
            state.user.error = false;
        },
        getUserFailed: (state) =>{
            state.user.isFetching = false;
            state.user.error = true;
        },

        updateUserStart: (state) =>{
            state.user.isFetching = true;
        },
        updateUserSuccess: (state,action) => {
            state.user.isFetching = false;
            state.user.userr = action.payload;
            state.user.error = false;
        },
        updateUserFailed: (state) =>{
            state.user.isFetching = false;
            state.user.error = true;
        },
    }
});

export const {
    getUsersStart,
    getUsersFailed,
    getUsersSuccess,

    deleteUserStart,
    deleteUserFailed,
    deleteUserSuccess,

    getUserStart,
    getUserFailed,
    getUserSuccess,

    updateUserStart,
    updateUserFailed,
    updateUserSuccess,

} = userSlice.actions;

export default userSlice.reducer;
