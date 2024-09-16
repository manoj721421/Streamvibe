import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTVNowPlaying=createAsyncThunk('TV/fetchNowPlaying',async()=>{
    let endpoint = process.env.REACT_APP_API_NOW_PLAYING_TV ;
      endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 3);
      const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchTVPopularList = createAsyncThunk('TV/fetchPopularList',async()=>{
    let endpoint = process.env.REACT_APP_API_POPULAR_TV;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchTVUpcomingList = createAsyncThunk('TV/fetchUpcomingList',async()=>{
    let endpoint = process.env.REACT_APP_API_ON_THE_AIR_TV;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})

export const fetchTVTopRatedList = createAsyncThunk('TV/fetchTopRatedList',async()=>{
    let endpoint = process.env.REACT_APP_API_TOP_RATED_TV;
    endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}",1);
    const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`
    const response = await axios.get(url);
    return response.data;
})


const AllShowsSclice = createSlice({
    name: 'AllShows',
    initialState:{
        TVPlaying:{
            status: 'idle',
            data:[],
            error:null
        },
        TVpopular:{
            status: 'idle',
            data:null,
            error:null
        },
        TVupcoming:{
            status: 'idle',
            data:null,
            error:null
        },
        TVtopRated:{
            status: 'idle',
            data:null,
            error:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTVNowPlaying.pending,(state)=>{
            state.TVPlaying.status = 'loading';
        })
        .addCase(fetchTVNowPlaying.fulfilled,(state,action)=>{
            state.TVPlaying.status = 'succeeded';
            state.TVPlaying.data = action.payload;
        })
        .addCase(fetchTVNowPlaying.rejected,(state,action)=>{
            state.TVPlaying.status = 'failed';
            state.TVPlaying.error = action.error.message;
        })


        .addCase(fetchTVPopularList.pending,(state)=>{
            state.TVpopular.status = 'loading';
        })
        .addCase(fetchTVPopularList.fulfilled,(state,action)=>{
            state.TVpopular.status = 'succeeded';
            state.TVpopular.data = action.payload
        })
        .addCase(fetchTVPopularList.rejected,(state,action)=>{
            state.TVpopular.status = 'failed';
            state.TVpopular.error = action.error.message
        })


        .addCase(fetchTVUpcomingList.pending,(state)=>{
            state.TVupcoming.status = 'loading';
        })
        .addCase(fetchTVUpcomingList.fulfilled,(state,action)=>{
            state.TVupcoming.status = 'succeeded';
            state.TVupcoming.data = action.payload
        })
        .addCase(fetchTVUpcomingList.rejected,(state,action)=>{
            state.TVupcoming.status = 'failed';
            state.TVupcoming.error = action.error.message
        })


        .addCase(fetchTVTopRatedList.pending,(state)=>{
            state.TVtopRated.status = 'loading';
        })
        .addCase(fetchTVTopRatedList.fulfilled,(state,action)=>{
            state.TVtopRated.status = 'succeeded';
            state.TVtopRated.data = action.payload
        })
        .addCase(fetchTVTopRatedList.rejected,(state,action)=>{
            state.TVtopRated.status = 'failed';
            state.TVtopRated.error = action.error.message
        })
    }
})


export default AllShowsSclice.reducer;