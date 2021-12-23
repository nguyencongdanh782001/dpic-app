import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api/index'

export const getExhPosts = createAsyncThunk('/getexhposts', async () => {
    try {
        const {data} = await api.fetchExhPosts()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPrivateExhPosts = createAsyncThunk('/getprivateexhposts', async () => {
    try {
        const {data} = await api.fetchPrivateExhPosts()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createExhPosts = createAsyncThunk('/createexhposts', async (value) => {
    try {
        const {data} = await api.createExhPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateExhPost = createAsyncThunk('/updateexhpost', async (value) => {
    try {
        const {data} = await api.updateExhPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const likeExhPost = createAsyncThunk('/likeexhpost', async (id) => {
    try {
        const {data} = await api.likeExhPost(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteExhPost = createAsyncThunk('/deletepost', async (id) => {
    try {
        const {data} = await api.deleteExhPost(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentExhPost = createAsyncThunk('/commentpost', async (value) => {
    try {
        const {data} = await api.commentExhPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})


const exhibitionPostSlice = createSlice({
    name:'exhibitionPost',
    initialState:{
        ExhPosts:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        [getExhPosts.fulfilled]:(state, action) => {
            if(action.payload){
                state.ExhPosts = action.payload.result
                state.isLoading = false
            }
        },
        [getPrivateExhPosts.fulfilled]:(state, action) => {
            if(action.payload){
                state.ExhPosts = action.payload.result
                state.isLoading = false
            }
        },
        [createExhPosts.fulfilled]:(state, action) => {
            state.ExhPosts.push(action.payload.result) 
        },
        [likeExhPost.fulfilled]:(state, action) => {
            state.ExhPosts = state.ExhPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [updateExhPost.fulfilled]:(state, action) => {
            state.ExhPosts = state.ExhPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [deleteExhPost.fulfilled]:(state, action) => {
            state.ExhPosts = state.ExhPosts.filter(post => post._id !== action.payload.result._id)
        },
        [commentExhPost.fulfilled]:(state, action) => {
            state.ExhPosts = state.ExhPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
    }
})

const exhibitionPostReducer = exhibitionPostSlice.reducer

export default exhibitionPostReducer