import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import * as api from '../../api/index.js'

export const getPostsBySearch = createAsyncThunk('/getpostbysearch', async (searchQuery) => {
    try {
        const {data} = await api.fetchPostsBySearch(searchQuery)
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

const searchSlice = createSlice({
    name:'search',
    initialState:{
        search:[],
        currentPage:[],
        totalPage:[],
        isLoading:true
    },
    reducers:{},
    extraReducers:{
        [getPostsBySearch.fulfilled]:(state, action) => {
            if(action.payload){
                state.search = [...state.search, ...action.payload.result]
                state.currentPage = action.payload.currentPage
                state.totalPage = action.payload.numberOfPage
                state.isLoading = false
            }
        },
        [likePost.fulfilled]:(state, action) => {
            state.search = state.search.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
        [commentPost.fulfilled]:(state, action) => {
            state.search = state.search.map(post => post._id === action.payload.result._id ? action.payload.result : {...post})
        },
    }
})

const searchReducer = searchSlice.reducer
export default searchReducer