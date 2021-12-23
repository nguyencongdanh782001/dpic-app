import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api/index'

//Library photos page
export const getPhotos = createAsyncThunk('/getphotos', async () => {
    try {
        const {data} = await api.fetchPhotos()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createPhoto = createAsyncThunk('/createphoto', async (value) => {
    try {
        const {data} = await api.createPhoto(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updatePhoto = createAsyncThunk('/updatephoto', async (value) => {
    try {
        const {data} = await api.updatePhoto(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deletePhoto = createAsyncThunk('/deletephoto', async (id) => {
    try {
        const {data} = await api.deletePhoto(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

const photosSlice = createSlice({
    name:'libPhotos',
    initialState:{
        libPhotos:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        //library photos
        [getPhotos.fulfilled]:(state, action) => {
            if(action.payload){
                state.libPhotos = action.payload.result
                state.isLoading = false
            }
        },
        [createPhoto.fulfilled]:(state, action) => {
            if(action.payload){
                state.libPhotos.push(action.payload.result) 
            }
        },
        [updatePhoto.fulfilled]:(state, action) => {
            if(action.payload){
                state.libPhotos.push(action.payload.result) 
            }
        },
        [deletePhoto.fulfilled]:(state, action) => {
            if(action.payload){
                state.libPhotos = state.libPhotos.filter(photo => photo._id !== action.payload.result._id) 
            }
        }
    }
})

const photosReducer = photosSlice.reducer
export default photosReducer