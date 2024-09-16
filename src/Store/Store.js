import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './GenresSlices';
import movieswiperreducer from './MovieSwiperSlices';
import allMoviesereducer from './MovieAllDetailSlices';
import allShowsreducer from './TVsSlices';
import MovieDetailreducer from './MovieDetail';
import SeriesDeatilsreducer from "./SeriesDetail";
import { fetchApiCall } from './Middlewares/FechApiCall';

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        movies: movieswiperreducer,
        allMovies: allMoviesereducer,
        allShows: allShowsreducer,
        MovieDetail: MovieDetailreducer,
        SeriesDetail:SeriesDeatilsreducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fetchApiCall),
});