import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//This api call happens by using the CreateAsyncThunk 
//this is one of the way to create and with out thunk also we can handle the api call
// export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
//     let endpoint = process.env.REACT_APP_API_GENRES_LIST;
//     endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
//     let url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`;
//     const response = await axios.get(url);
//     return response.data;
// });

const genresSlice = createSlice({
    name: 'genres',
    initialState: {
        data: null,
        status: 'idle',
        error: null
    },
    reducers: {
        //here instead of extra reducers we can dclare some cases here wher we can handle the states directly 
        //here in the slice reducer we are not going to create api calls 
        //those will call from useEffect but they will call the reducer methods to handle state 

        fetchGenres(state)
        {
            state.status = "loading"
        },
        fetchGenresError(state, action)
        {
            state.status = "Failed"
            state.error = action.error || "Something Went Wrong"
        },
        updateGenres(state, action)
        {
            state.status = "succeeded"
            state.data = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchGenres.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchGenres.fulfilled, (state, action) => {
    //             state.status = 'succeeded';
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchGenres.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.error.message;
    //         });
    // }
});

//export the rreducer function actions 
export const {fetchGenres,updateGenres,fetchGenresError} = genresSlice.actions;

export default genresSlice.reducer;