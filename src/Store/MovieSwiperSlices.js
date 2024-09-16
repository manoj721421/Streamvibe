import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch now playing movies
export const fetchNowPlayingMovieForSwiper = createAsyncThunk(
  'movies/fetchNowPlayingSome',
  async (_, { rejectWithValue }) => {
    try {
      let endpoint = process.env.REACT_APP_API_NOW_PLAYING;
      endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
      const url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`;

      const response = await axios.get(url);
      const movieData = response?.data;
      const currentplayList = movieData?.results?.slice(0, 10);

      const movieDetails = await Promise.all(currentplayList.map(async (item) => {
        let endpoint1 = process.env.REACT_APP_API_MOVIES_IMAGES;
        endpoint1 = endpoint1.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace('{movieId}', item?.id);
        const url1 = `${process.env.REACT_APP_API_BASEURL}${endpoint1}`;
        const res1 = await axios.get(url1);
        return { ...item, logo: res1?.data?.logos.find(logo => logo.iso_639_1 === 'en')?.file_path || null };
      }));

      return movieDetails;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const MovieSwiperSlice = createSlice({
  name: 'swiperList',
  initialState: {
    swipelist: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovieForSwiper.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNowPlayingMovieForSwiper.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.swipelist = action.payload;
      })
      .addCase(fetchNowPlayingMovieForSwiper.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default MovieSwiperSlice.reducer;
