import { createSlice } from "@reduxjs/toolkit";

const binSlice = createSlice({
    name: "bin",
    initialState:{
        bins:{
            allBins:null,
            isFetching: false,
            error:false
        },
        bin:{
            binn:null,
            isFetching: false,
            error:false
        },
        msg: "",
        
    },
    reducers:{
        getBinsStart: (state) =>{
            state.bins.isFetching = true;
            state.msg = "";
        },
        getBinsSuccess: (state,action) => {
            state.bins.isFetching = false;
            state.bins.allBins = action.payload;
            state.bins.error = false;
        },
        getBinsFailed: (state) =>{
            state.bins.isFetching = false;
            state.bins.error = true;
        },

       deleteBinStart: (state) =>{
            state.bins.isFetching = true;
        },
        deleteBinSuccess: (state,action) => {
            state.bins.isFetching = false;
            state.msg = action.payload;
        },
        deleteBinFailed: (state) =>{
            state.bins.isFetching = false;
            state.bins.error = true;
            state.msg = action.payload;
        },

        getBinStart: (state) =>{
            state.bin.isFetching = true;
        },
        getBinSuccess: (state,action) => {
            state.bin.isFetching = false;
            state.bin.binn = action.payload;
            state.bin.error = false;
        },
        getBinFailed: (state) =>{
            state.bin.isFetching = false;
            state.bin.error = true;
        },

        updateBinStart: (state) =>{
            state.bin.isFetching = true;
        },
        updateBinSuccess: (state,action) => {
            state.bin.isFetching = false;
            state.bin.binn = action.payload;
            state.bin.error = false;
        },
        updateBinFailed: (state) =>{
            state.bin.isFetching = false;
            state.bin.error = true;
        },
    }
});

export const {
    getBinsStart,
    getBinsFailed,
    getBinsSuccess,

    deleteBinStart,
    deleteBinFailed,
    deleteBinSuccess,

    getBinStart,
    getBinFailed,
    getBinSuccess,

    updateBinStart,
    updateBinFailed,
    updateBinSuccess,

} = binSlice.actions;

export default binSlice.reducer;
