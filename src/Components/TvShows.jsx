import React, { useEffect } from 'react'
import Genres from '../SharedComponets/Genres'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTVNowPlaying, fetchTVPopularList, fetchTVTopRatedList, fetchTVUpcomingList } from '../Store/TVsSlices';
import TVShowsCards from '../SharedComponets/TVShowsCards';

const TvShows = () => {
    const genres = useSelector((state) => state.genres.data);
    const dispatch = useDispatch();
    //Shows details from store by API calls
    const TVNowPlaying = useSelector((state) => state.allShows.TVPlaying.data);
    const TVNowPlayingStatus = useSelector((state) => state.allShows.TVPlaying.status)
    const TVpopular = useSelector((state) => state.allShows.TVpopular.data);
    const TVpopularsStatus = useSelector((state) => state.allShows.TVpopular.status)
    const TVupcoming = useSelector((state) => state.allShows.TVupcoming.data);
    const TVupcomingsStatus = useSelector((state) => state.allShows.TVupcoming.status)
    const TVtopRated = useSelector((state) => state.allShows.TVtopRated.data);
    const TVtopRatedsStatus = useSelector((state) => state.allShows.TVtopRated.status)

    useEffect(() => {
        if (TVNowPlayingStatus === "idle") {
            dispatch(fetchTVNowPlaying())
        }
        if (TVpopularsStatus === "idle") {
            dispatch(fetchTVPopularList())
        }
        if (TVupcomingsStatus === "idle") {
            dispatch(fetchTVUpcomingList())
        }
        if (TVtopRatedsStatus === "idle") {
            dispatch(fetchTVTopRatedList())
        }
    }, [TVNowPlayingStatus, TVpopularsStatus, TVupcomingsStatus, TVtopRatedsStatus, dispatch])

    console.log(TVNowPlaying, TVpopular, TVupcoming, TVtopRated);

    return (
        <>
            <div className="container my-5 pt-4">
                <form>
                    <fieldset className=''>
                        <legend className=''><button className='text-white btn background-red'>Shows</button></legend>


                        {/* This section is for the Genres section */}
                        <div className='d-flex justify-content-between text-aligns-center'>
                            <Genres genreList={genres} head="Our Genres" pagination={true} />
                        </div>

                        {/* this section is for the upcoming updatedPlayList (upcoming) */}
                        <TVShowsCards movieList={TVNowPlaying?.results} head="New Releases" pagination={true} cardType="upcoming" />

                        {/* this section is for the nowplaying updated list (New release ) */}
                        <TVShowsCards movieList={TVpopular?.results} head="Now Playing" pagination={true} cardType="nowplaying" />

                        {/* this section is for the Tresnign list (Tending list) */}
                        <TVShowsCards movieList={TVupcoming?.results} head="Trending Now" pagination={true} cardType="popular" />

                        {/* this section is for the TOp rated updated list(top rated list) */}
                        <TVShowsCards movieList={TVtopRated?.results} head="Must-Watch Shows" pagination={true} cardType="toprated" />
                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default TvShows