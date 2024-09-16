import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchNowPlaying, fetchPopularList, fetchTopRatedList, fetchUpcomingList } from '../Store/MovieAllDetailSlices';
import { useLocation } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import MoviesCards from '../SharedComponets/MoviesCards';

const movieTypeConfig = {
    'Now Playing': { action: fetchNowPlaying, selector: state => state.allMovies.currentplaying },
    'Trending Now': { action: fetchPopularList, selector: state => state.allMovies.popular },
    'New Releases': { action: fetchUpcomingList, selector: state => state.allMovies.upcoming },
    'Must-Watch movies': { action: fetchTopRatedList, selector: state => state.allMovies.topRated },
};

const MoreMovies = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [pageNo, setPageNo] = useState(1);
    const [allMovies, setAllMovies] = useState([]);
    const movieType = decodeURIComponent(location?.pathname.split('/')[2]);

    const { action, selector } = movieTypeConfig[movieType] || movieTypeConfig['now playing'];
    const { data, status } = useSelector(selector);

    const fetchData = useCallback(() => {
        dispatch(action(pageNo));
    }, [dispatch, action, pageNo]);

    useEffect(() => {
        fetchData();
    }, [fetchData, movieType]);

    useEffect(() => {
        if (data?.results) {
            setAllMovies(prevMovies => {
                const newMovies = data.results.filter(
                    newMovie => !prevMovies.some(existingMovie => existingMovie.id === newMovie.id)
                );
                return [...prevMovies, ...newMovies];
            });
        }
    }, [data]);

    const handleLoadMore = () => setPageNo(prev => prev + 1);

    if (status === 'loading' && allMovies.length === 0) return <div>Loading...</div>;
    if (status === 'failed') return <div>Error loading movies</div>;

    return (
        <>
            <MoviesCards
                movieList={allMovies}
                head={movieType}
                pagination={false}
                cardType={movieType}
            />
            <div className='container'>
                <Row>
                    <Col md={12}>
                        <Button
                            className='background-red text-center w-100 btn'
                            onClick={handleLoadMore}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Loading...' : 'Load More'}
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default MoreMovies;