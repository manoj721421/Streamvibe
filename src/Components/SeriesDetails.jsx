import React, { useEffect, useState } from 'react'
import { Accordion, Card, CardBody, Col, Row } from 'react-bootstrap'
import { BrowserView } from 'react-device-detect'
import FreeTrailBanner from '../SharedComponets/FreeTrailBanner';
import SeriesAccordians from '../SharedComponets/SeriesAccordians';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesDetails } from '../Store/SeriesDetail';

const SeriesDetails = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const ShowID = location?.pathname.split('/')[2]
    const itemsPerPage = 8;
    const [defaultKey, setDefaultkey] = useState(0);
    const [Episodes, setEpisodes] = useState([]);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.SeriesDetail);

    useEffect(() => {
        dispatch(fetchSeriesDetails(ShowID));
    }, [dispatch, ShowID])

    const GetActiveAccordian = async (activeId) => {
        console.log(activeId);
        setDefaultkey(activeId);
        let episodesEndpoint = process.env.REACT_APP_API_SHOWS_SEASON_DETAILS;
        episodesEndpoint = episodesEndpoint.replace('{Show_Id}', ShowID).replace('{Season_Number}', activeId).replace('{ApiKey}', process.env.REACT_APP_API_KEY);
        const detailsUrl = `${process.env.REACT_APP_API_BASEURL}${episodesEndpoint}`;
        console.log(detailsUrl);
        const EpisodesResponse = await axios.get(detailsUrl);
        const SeriesDetails = EpisodesResponse.data;
        setEpisodes(SeriesDetails?.episodes)
        console.log(SeriesDetails?.episodes);
    }

    const totalPages = Math.ceil(data?.details?.cast?.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data?.details?.cast?.slice(startIndex, endIndex);
    return (
        <>
            {/* This is the top info dispaly section with logo, and details*/}
            <div style={{ height: "85vh", backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.details.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <Row className='justify-content-center align-items-end' style={{ height: "80vh", zIndex: "99" }}>
                    <div className='landScreenmask'></div>
                    <Col md={8} sm={8} className='mb-5' style={{ zIndex: "99" }}>
                        <div className=" d-flex justify-content-between text-center align-items-center" style={{ gap: "8rem" }}>
                            <BrowserView>
                                <div>
                                    <img src={`https://image.tmdb.org/t/p/original${data?.details?.poster_path}`} className='rounded ' width="350px" alt="" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.8)" }} />
                                </div>
                            </BrowserView>
                            <div className='mx-3'>
                                <div className="mb-3 text-center">
                                    {
                                        data.details?.logo !== null ?
                                            <img src={`https://image.tmdb.org/t/p/original${data.details?.logo}`} width="400px" alt={data.details?.title} className='img-fluid' /> :
                                            <h1 className='text-white'>{data.details?.title}</h1>
                                    }
                                </div>
                                <small className='text-white' style={{ fontSize: "1em" }}>{data.details?.overview}</small>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button className='btn background-red text-white mx-2'><i class="fa-solid fa-play text-white"></i> Play Now</button>
                                    <button className='btn btn-dark  border border-dark mx-1 text-white'><i class="fa-solid fa-plus"></i></button>
                                    <button className='btn btn-dark border border-dark mx-1 text-white'><i class="fa-solid fa-thumbs-up"></i></button>
                                    <button className='btn btn-dark border border-dark mx-1 text-white'><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* This is the top info dispaly section with logo, and details*/}

            <div className='container text-white  mt-5 pt-4'>
                <Row>
                    {/* This is overview, cast and Review section */}
                    <Col md={9} sm={12} className='mt-5'>
                        {/* Season Details section */}
                        <div className="p-4 border border-secondary rounded rounded-3 background-dark">
                            <p className='text-white mb-3 fw-bold'>Seasons and Episodes</p>
                            <Accordion style={{ backgroundColor: "#141414 !important" }} defaultActiveKey={defaultKey}>

                                {
                                    data?.details?.seasons?.map((season, index) => {
                                        return (
                                            <>
                                                <SeriesAccordians eventKey={season?.season_number} Header={season?.name} subHeader={season?.episode_count} episodes={Episodes} setEpisodes={setEpisodes} onPress={GetActiveAccordian} />
                                            </>
                                        )
                                    })
                                }
                            </Accordion>
                        </div>
                        {/* Season Details section */}

                        {/* Overview section*/}
                        <div className="mt-4 p-4 border border-secondary rounded rounded-3 background-dark">
                            <p className='text-secondary mb-3 fw-bold'>Description</p>
                            <p>{data.details?.overview}</p>
                        </div>

                        {/* cast View section*/}
                        <div className="mt-4 p-4 border border-secondary rounded rounded-3 background-dark">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className='text-secondary mb-3 fw-bold'>Cast</p>
                                <div className="d-flex">
                                    <div className="rounded rounded-5 border background-dark border-dark px-3 py-2" type="button" onClick={handlePrevPage}><i class="fa-solid fa-arrow-left fa-1x"></i></div>
                                    <div className="rounded rounded-5 border background-dark border-dark px-3 py-2" type="button" onClick={handleNextPage}><i class="fa-solid fa-arrow-right"></i></div>
                                </div>
                            </div>
                            <div className='d-flex flex-wrap align-items-center gap-3'>
                                {
                                    currentItems?.map((item) => {
                                        return (
                                            <div className='d-block text-center'>
                                                <img src={`https://image.tmdb.org/t/p/original${item?.profile_path}`} className='rounded rounded-3' width="100px" alt="" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/*Review section */}
                        <div className="mt-4 p-4 border border-secondary rounded rounded-3 background-dark">
                            <div className="d-flex justify-content-between">
                                <label>Review</label>
                                <div>
                                    <button className='btn btn-dark border border-secondary' type="button"><i class="fa-solid fa-plus"></i> Add Your Review</button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Row>
                                    <Col md="6">
                                        <Card className='text-white background-black p-2'>
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="">
                                                        <p>author</p>
                                                        <p>UserName</p>
                                                    </div>
                                                    <div>
                                                        <p>Ratings........</p>
                                                    </div>
                                                </div>
                                                <div className='mt-2'>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, nesciunt temporibus aut enim autem officiis quae blanditiis distinctio molestiae nisi repellendus sapiente delectus sequi debitis aperiam...</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md="6">
                                        <Card className='text-white background-black p-2'>
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="">
                                                        <p>author</p>
                                                        <p>UserName</p>
                                                    </div>
                                                    <div>
                                                        <p>Ratings........</p>
                                                    </div>
                                                </div>
                                                <div className='mt-2'>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident hic repellat est. Adipisci at laboriosam temporibus veniam animi itaque. Corrupti fugit voluptas perspiciatis architecto dicta expedita ipsum ...</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Col>
                    {/* This is overview, cast and Review section */}

                    {/* This is releasedate, genres, language, director and music director section */}
                    <Col md={3} sm={12} className='mt-5'>
                        <div className='p-3 background-dark border border-secondary rounded rounded-3'>

                            {/* release Date */}
                            <div>
                                <p><i class="fa-regular fa-calendar color-red"></i> Released Date</p>
                                <p>{data.details?.first_air_date}</p>
                            </div>

                            {/* Language available */}
                            <div className='mt-4'>
                                <p className="mb-2"><i class="fa-solid fa-language color-red"></i> Available Languages</p>
                                <div className="d-flex">
                                    {
                                        data.details?.spoken_languages?.map((lang) => {
                                            return <p className='background-black p-1 me-2 rounded border border-secondary'>{lang?.english_name}</p>
                                        })
                                    }
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="mt-4">
                                <label className='mb-2'><i class="fa-solid fa-film color-red"></i> Genres</label>
                                <div className="d-flex flex-wrap">
                                    {
                                        data.details?.genres?.map((genre) => {
                                            return (
                                                <p className='background-black p-1 me-2 mb-2 rounded border border-secondary'>{genre?.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* RunTime and Vote Count */}
                            {/* <div className="mt-4 d-flex">
                                <div className="me-5">
                                    <div className="mb-2"><i class="fa-solid fa-clock color-red"></i> Run Time</div>
                                    <p className="background-black p-1 me-2 mb-2 rounded border border-secondary">{data.details?.runtime} min</p>
                                </div>
                                <div className="">
                                    <div className="mb-2"><i class="fa-solid fa-star color-red"></i>Rating</div>
                                    <p className=" background-black p-1 me-2 mb-2 rounded border border-secondary">{data.details?.vote_average}</p>
                                </div>
                            </div> */}

                            {/* Director */}
                            <div className="mt-4 ">
                                <label className='mb-2'><i class="fa-solid fa-user color-red"></i> Director</label>
                                <div className='p-2 border border-secondary rounded background-black'>
                                    {
                                        data.details?.crew?.filter((crew) => crew?.job === "Director" || crew?.department === "Writing").map((director) => {
                                            return (
                                                <div className='d-flex'>
                                                    <img src={`https://image.tmdb.org/t/p/w45${director?.profile_path}`} className='rounded' alt="director" />
                                                    <div className=" mx-3">
                                                        <p>{director?.name}</p>
                                                        <p className='text-secondary'>{director?.department}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Crew */}
                            <div className="mt-4 ">
                                <label className='mb-2'><i class="fa-solid fa-user color-red">&nbsp;</i>Music</label>
                                <div className='p-2 border border-secondary rounded background-black'>
                                    {
                                        (() => {
                                            const director = data.details?.crew?.find((crew) => crew?.department === "Sound");
                                            if (director) {
                                                return (
                                                    <div className='d-flex'>
                                                        <img src={`https://image.tmdb.org/t/p/w45${director?.profile_path}`} className='rounded' alt="director" />
                                                        <div className="mx-3">
                                                            <p>{director?.name}</p>
                                                            <p className='text-secondary'>{director?.department}</p>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return <p>No sound director found</p>;
                                            }
                                        })()

                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* This is releasedate, genres, language, director and music director section */}
                </Row>
            </div>


            <FreeTrailBanner />

        </>
    )
}

export default SeriesDetails