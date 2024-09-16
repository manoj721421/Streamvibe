import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSeriesDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (ShowID, { rejectWithValue }) => {
        try {
            // Fetch movie details
            let detailsEndpoint = process.env.REACT_APP_API_SHOWS_DETAILS;
            detailsEndpoint = detailsEndpoint.replace('{Show_Id}', ShowID).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const detailsUrl = `${process.env.REACT_APP_API_BASEURL}${detailsEndpoint}`;
            console.log(detailsUrl);
            const detailsResponse = await axios.get(detailsUrl);
            const SeriesDetails = detailsResponse.data;

            // Fetch movie cast
            let castEndpoint = process.env.REACT_APP_API_SHOWS_CAST;
            castEndpoint = castEndpoint.replace('{Show_Id}', ShowID).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const castUrl = `${process.env.REACT_APP_API_BASEURL}${castEndpoint}`;
            console.log(castUrl);
            const castResponse = await axios.get(castUrl);
            const SeriesCast = castResponse.data;

            // Fetch movie reviews
            let reviewEndpoint = process.env.REACT_APP_API_SHOWS_REVIEW;
            reviewEndpoint = reviewEndpoint.replace('{Show_Id}', ShowID).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
            const reviewUrl = `${process.env.REACT_APP_API_BASEURL}${reviewEndpoint}`;
            console.log(reviewUrl);
            const reviewResponse = await axios.get(reviewUrl);
            const SeriesReviews = reviewResponse.data;

            // Fetch movie logo
            let endpoint1 = process.env.REACT_APP_API_TV_IMAGES;
            endpoint1 = endpoint1.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace('{tvId}', ShowID);
            const url1 = `${process.env.REACT_APP_API_BASEURL}${endpoint1}`;
            console.log(url1);
            const res1 = await axios.get(url1);
            const SeriesLogo = res1?.data?.logos.find(logo => logo.iso_639_1 === 'en')?.file_path || null;

            // Combine all data into one response
            const combinedData = {
                ...SeriesDetails,
                logo: SeriesLogo,
                cast: SeriesCast.cast,
                crew: SeriesCast.crew,
                reviews: SeriesReviews.results,
            };
            console.log(combinedData);
            return combinedData;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);




const SeriesDetailSlice = createSlice({
    name: 'SeriesDetails',
    initialState: {
        details: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeriesDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.details = action.payload;
            })
            .addCase(fetchSeriesDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default SeriesDetailSlice.reducer;