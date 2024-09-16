import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (movieId, { rejectWithValue }) => {
        try {
            // Fetch movie details
            let detailsEndpoint = process.env.REACT_APP_API_MOVIE_DETAILS;
            detailsEndpoint = detailsEndpoint.replace('{movie_id}', movieId).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const detailsUrl = `${process.env.REACT_APP_API_BASEURL}${detailsEndpoint}`;
            const detailsResponse = await axios.get(detailsUrl);
            const movieDetails = detailsResponse.data;

            // Fetch movie cast
            let castEndpoint = process.env.REACT_APP_API_MOVIE_CAST;
            castEndpoint = castEndpoint.replace('{movie_id}', movieId).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const castUrl = `${process.env.REACT_APP_API_BASEURL}${castEndpoint}`;
            const castResponse = await axios.get(castUrl);
            const movieCast = castResponse.data;

            // Fetch movie reviews
            let reviewEndpoint = process.env.REACT_APP_API_MOVIE_REVIEW;
            reviewEndpoint = reviewEndpoint.replace('{movie_id}', movieId).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const reviewUrl = `${process.env.REACT_APP_API_BASEURL}${reviewEndpoint}`;
            const reviewResponse = await axios.get(reviewUrl);
            const movieReviews = reviewResponse.data;

            //fetch movie logo
            let endpoint1 = process.env.REACT_APP_API_MOVIES_IMAGES;
            endpoint1 = endpoint1.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace('{movieId}', movieId);
            const url1 = `${process.env.REACT_APP_API_BASEURL}${endpoint1}`;
            const res1 = await axios.get(url1);
            const movieLogo = res1?.data?.logos.find(logo => logo.iso_639_1 === 'en')?.file_path || null;

            // Combine all data into one response
            const combinedData = {
                ...movieDetails,
                logo:movieLogo,
                cast: movieCast.cast,
                crew: movieCast.crew,
                reviews: movieReviews.results,
            };
            console.log(combinedData);
            return combinedData;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);




const MovieDetailSlice = createSlice({
    name: 'MovieDetails',
    initialState: {
        details: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.details = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default MovieDetailSlice.reducer;