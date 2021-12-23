import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../../api/index'

export const getAdvertise = createAsyncThunk('/getadvertise', async () => {
    try {
        const {data} = await api.fetchAdvertises()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createAdvertise = createAsyncThunk('/createadvertise', async (value) => {
    try {
        const {data} = await api.createAdvertise(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateAdvertise = createAsyncThunk('/updateadvertise', async (value) => {
    try {
        const {data} = await api.updateAdvertise(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteAdvertise = createAsyncThunk('/deleteadvertise', async (id) => {
    try {
        const {data} = await api.deleteAdvertise(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

const advertiseSlice = createSlice({
    name:'advertise',
    initialState:{
        Advertise:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        [getAdvertise.fulfilled]:(state, action) => {
            if(action.payload){
                state.Advertise = action.payload.result
                state.isLoading = false
            }
        },
        [createAdvertise.fulfilled]:(state, action) => {
            state.Advertise.push(action.payload.result) 
        },
        [updateAdvertise.fulfilled]:(state, action) => {
            state.Advertise = state.Advertise.map(advertise => advertise._id === action.payload.result._id ? action.payload.result : {...advertise})
        },
        [deleteAdvertise.fulfilled]:(state, action) => {
            state.Advertise = state.Advertise.filter(advertise => advertise._id !== action.payload.result._id)
        },
    }
})

const advertiseReducer = advertiseSlice.reducer

export default advertiseReducer