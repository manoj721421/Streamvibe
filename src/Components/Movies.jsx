import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../Store/GenresSlices';
import SwiperComponent from '../SharedComponets/Swiper'
import Genres from '../SharedComponets/Genres';
import { fetchNowPlayingMovieForSwiper } from '../Store/MovieSwiperSlices';
import { fetchNowPlaying, fetchPopularList, fetchTopRatedList, fetchUpcomingList } from '../Store/MovieAllDetailSlices';
import MoviesCards from '../SharedComponets/MoviesCards';
import TvShows from './TvShows';
import FreeTrailBanner from '../SharedComponets/FreeTrailBanner';

const Movies = () => {
  const dispatch = useDispatch();
  const {
    genres: { data: genres, status: genresStatus },
    movies: { swipelist, status },
    allMovies: {
      currentplaying: { data: currentplaying, status: newReleaseStatus },
      popular: { data: popular, status: popularStatus },
      upcoming: { data: upcoming, status: upcomingStatus },
      topRated: { data: topRated, status: topRatedStatus }
    }
  } = useSelector((state) => state);

  const fetchDataIfNeeded = useCallback((status, action, ...args) => {
    if (status === 'idle') {
      dispatch(action(...args));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDataIfNeeded(genresStatus, fetchGenres);
    fetchDataIfNeeded(status, fetchNowPlayingMovieForSwiper);
    fetchDataIfNeeded(newReleaseStatus, fetchNowPlaying, 1);
    fetchDataIfNeeded(popularStatus, fetchPopularList, 1);
    fetchDataIfNeeded(upcomingStatus, fetchUpcomingList, 1);
    fetchDataIfNeeded(topRatedStatus, fetchTopRatedList, 1);
  }, [fetchDataIfNeeded, genresStatus, status, newReleaseStatus, popularStatus, upcomingStatus, topRatedStatus]);

  return (
    <>
      <div className="">
        <SwiperComponent nowplaying={swipelist} />
      </div>
      <div className="container mt-5 pt-2">
        <form>
          <fieldset>
            <legend><button className='text-white btn background-red'>Movies</button></legend>

            <div className='d-flex justify-content-between text-aligns-center'>
              <Genres genreList={genres} head="Our Genres" pagination={true} />
            </div>

            <MoviesCards movieList={upcoming?.results} head="New Releases" pagination={true} cardType="upcoming" />
            <MoviesCards movieList={currentplaying?.results} head="Now Playing" pagination={true} cardType="nowplaying" />
            <MoviesCards movieList={popular?.results} head="Trending Now" pagination={true} cardType="popular" />
            <MoviesCards movieList={topRated?.results} head="Must-Watch movies" pagination={true} cardType="toprated" />
          </fieldset>
        </form>
      </div>
      <TvShows />
      <FreeTrailBanner/>
    </>
  )
}

export default Movies