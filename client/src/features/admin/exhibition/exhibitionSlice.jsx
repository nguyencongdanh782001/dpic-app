import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../../api/index'

export const getExhibition = createAsyncThunk('/getexhibition', async () => {
    try {
        const {data} = await api.fetchExhibition()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createExhibition = createAsyncThunk('/createexhibition', async (value) => {
    try {
        const {data} = await api.createExhibition(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateExhibition = createAsyncThunk('/updateexhibition', async (value) => {
    try {
        const {data} = await api.updateExhibition(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteExhibition = createAsyncThunk('/deleteexhibition', async (id) => {
    try {
        const {data} = await api.deleteExhibition(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

const exhibitionSlice = createSlice({
    name:'exhibition',
    initialState:{
        Exhibition:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        [getExhibition.fulfilled]:(state, action) => {
            if(action.payload){
                state.Exhibition = action.payload.result
                state.isLoading = false
            }
        },
        [createExhibition.fulfilled]:(state, action) => {
            state.Exhibition.push(action.payload.result) 
        },
        [updateExhibition.fulfilled]:(state, action) => {
            state.Exhibition = state.Exhibition.map(exhibition => exhibition._id === action.payload.result._id ? action.payload.result : {...exhibition})
        },
        [deleteExhibition.fulfilled]:(state, action) => {
            state.Exhibition = state.Exhibition.filter(exhibition => exhibition._id !== action.payload.result._id)
        },
    }
})

const exhibitionReducer = exhibitionSlice.reducer

export default exhibitionReducer