import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNowPlaying=createAsyncThunk('movies/fetchNowPlaying',async(pageSize)=>{
    let endpoint = process.env.REACT_APP_API_NOW_PLAYING;
      endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", pageSize);
      const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchPopularList = createAsyncThunk('movies/fetchPopularList',async(pageSize)=>{
    let endpoint = process.env.REACT_APP_API_POPULAR_LIST;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", pageSize);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchUpcomingList = createAsyncThunk('movies/fetchUpcomingList',async(pageSize)=>{
    let endpoint = process.env.REACT_APP_API_UPCOMING;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}",pageSize);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchTopRatedList = createAsyncThunk('movies/fetchTopRatedList',async(pageSize)=>{
    let endpoint = process.env.REACT_APP_API_TOP_RATED_LIST;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}",pageSize);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})


const AllMoviesSclice = createSlice({
    name: 'Allmovies',
    initialState:{
        currentplaying:{
            status: 'idle',
            data:[],
            error:null
        },
        popular:{
            status: 'idle',
            data:null,
            error:null
        },
        upcoming:{
            status: 'idle',
            data:null,
            error:null
        },
        topRated:{
            status: 'idle',
            data:null,
            error:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNowPlaying.pending,(state)=>{
            state.currentplaying.status = 'loading';
        })
        .addCase(fetchNowPlaying.fulfilled,(state,action)=>{
            state.currentplaying.status = 'succeeded';
            state.currentplaying.data = action.payload;
        })
        .addCase(fetchNowPlaying.rejected,(state,action)=>{
            state.currentplaying.status = 'failed';
            state.currentplaying.error = action.error.message;
        })


        .addCase(fetchPopularList.pending,(state)=>{
            state.popular.status = 'loading';
        })
        .addCase(fetchPopularList.fulfilled,(state,action)=>{
            state.popular.status = 'succeeded';
            state.popular.data = action.payload
        })
        .addCase(fetchPopularList.rejected,(state,action)=>{
            state.popular.status = 'failed';
            state.popular.error = action.error.message
        })


        .addCase(fetchUpcomingList.pending,(state)=>{
            state.upcoming.status = 'loading';
        })
        .addCase(fetchUpcomingList.fulfilled,(state,action)=>{
            state.upcoming.status = 'succeeded';
            state.upcoming.data = action.payload
        })
        .addCase(fetchUpcomingList.rejected,(state,action)=>{
            state.upcoming.status = 'failed';
            state.upcoming.error = action.error.message
        })


        .addCase(fetchTopRatedList.pending,(state)=>{
            state.topRated.status = 'loading';
        })
        .addCase(fetchTopRatedList.fulfilled,(state,action)=>{
            state.topRated.status = 'succeeded';
            state.topRated.data = action.payload
        })
        .addCase(fetchTopRatedList.rejected,(state,action)=>{
            state.topRated.status = 'failed';
            state.topRated.error = action.error.message
        })
    }
})


export default AllMoviesSclice.reducer;