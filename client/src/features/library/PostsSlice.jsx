import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api/index'

//Library posts page
export const getLibPosts = createAsyncThunk('/getlibposts', async () => {
    try {
        const {data} = await api.fetchLibPosts()
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createLibPosts = createAsyncThunk('/createlibposts', async (value) => {
    try {
        const {data} = await api.createPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateLibPost = createAsyncThunk('/updatelibpost', async (value) => {
    try {
        const {data} = await api.updatePost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const likeLibPost = createAsyncThunk('/likepost', async (id) => {
    try {
        const {data} = await api.likePost(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteLibPost = createAsyncThunk('/deletepost', async (id) => {
    try {
        const {data} = await api.deletePost(id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentPost = createAsyncThunk('/commentpost', async (value) => {
    try {
        const {data} = await api.commentPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

const postsSlice = createSlice({
    name:'libPosts',
    initialState:{
        libPosts:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        //library posts
        [getLibPosts.fulfilled]:(state, action) => {
            if(action.payload){
                state.libPosts = action.payload.result
                state.isLoading = false
            }
        },
        [createLibPosts.fulfilled]:(state, action) => {
            state.libPosts.push(action.payload.result) 
        },
        [likeLibPost.fulfilled]:(state, action) => {
            state.libPosts = state.libPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [updateLibPost.fulfilled]:(state, action) => {
            state.libPosts = state.libPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [deleteLibPost.fulfilled]:(state, action) => {
            state.libPosts = state.libPosts.filter(post => post._id !== action.payload.result._id)
        },
        [commentPost.fulfilled]:(state, action) => {
            state.libPosts = state.libPosts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
    }
})

const libPostsReducer = postsSlice.reducer
export default libPostsReducer