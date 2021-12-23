import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api/index.js'

export const getPosts = createAsyncThunk('/getpost', async (page) => {
    try {
        const {data} = await api.fetchPosts(page)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostsBySearch = createAsyncThunk('/getpostbysearch', async (searchQuery) => {
    try {
        const {data} = await api.fetchPostsBySearch(searchQuery)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const createPost = createAsyncThunk('/createpost', async (value) => {
    try {
        const {data} = await api.createPost(value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const likePost = createAsyncThunk('/likepost', async (id) => {
    try {
        const {data} = await api.likePost(id)
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
    name:'posts',
    initialState:{
        posts:[],
        currentPage:[],
        totalPage:[],
        isLoading: true
    },
    reducers:{},
    extraReducers:{
        [getPosts.fulfilled]:(state, action) => {
            if(action.payload){
                state.posts = [...state.posts, ...action.payload.result]
                state.currentPage = action.payload.currentPage
                state.totalPage = action.payload.numberOfPage
                state.isLoading = false
            }
        },
        [getPostsBySearch.fulfilled]:(state, action) => {
            if(action.payload){
                state.posts = action.payload.result
            }
        },
        [createPost.fulfilled]:(state, action) => {
           state.posts.push(action.payload.result)
        },
        [likePost.fulfilled]:(state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [commentPost.fulfilled]:(state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
    }
})

const postReducer = postsSlice.reducer
export default postReducer