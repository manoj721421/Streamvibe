import React, { useState } from 'react'
import PropTypes from "prop-types";
import Pagination from './Pagination';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import "../SharedComponets/sharedCompoenet.scss";
import {useNavigate} from "react-router-dom";
import {isMobile} from 'react-device-detect';

const MoviesCards = ({ movieList, head, subHead, pagination, cardType }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const MoviesPerPage = 4;
    const totalPages = Math.ceil(movieList?.length / MoviesPerPage);

    const indexOfLastGenre = currentPage * MoviesPerPage;
    const indexOfFirstGenre = indexOfLastGenre - MoviesPerPage;
    const currentmovies = pagination ? movieList?.slice(indexOfFirstGenre, indexOfLastGenre) : movieList;
    return (
        <>
            <div className="container  mt-5 pt-3">
                <div className="d-flex text-white justify-content-between">
                    <div>
                        <h2>{head}</h2>
                        <p style={{ fontSize: "0.8em" }}>{subHead}</p>
                    </div>
                    {
                        pagination && currentmovies &&
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageType={head}
                            onPageChange={setCurrentPage}
                        />
                    }
                </div>
                <div>
                    <Row className={`mt-5 ${isMobile && "genresCard"}`}>
                        {
                            currentmovies &&
                            currentmovies?.map((item, index) => {
                                return (
                                    <>
                                        <Col className='mb-3' md={3} sm={6} xs={9}>
                                            <Card className='background-dark ' style={{ width: '18rem', borderRadius: "1em" }} onClick={()=>{navigate(`/movie/${item?.id}`)}}>
                                                <Card.Img className='p-2' variant="top" src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} style={{ borderRadius: "1em" }} />
                                                <Card.Body>
                                                    {
                                                        cardType.toLowerCase() === 'upcoming' ?
                                                            <div className='text-center rounded rounded-5 border border-secondary text-white'>
                                                                <p className='text-white'>Released at {moment(item?.release_date).format("Do MMMM YYYY")}</p>
                                                            </div> :
                                                            <div className='d-flex justify-content-between text-white align-items-center'>
                                                                <Card.Text className='' style={{ width: "50%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>
                                                                    <small>#{item?.id}<br/></small>
                                                                    {item?.title ? item?.title : item?.name}
                                                                </Card.Text>
                                                                <Card.Text className='text-center' style={{ textWrap: "nowrap" }}><i class="fa-solid fa-heart color-red"></i> {item?.vote_average}</Card.Text>
                                                            </div>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        </>
    )
}

MoviesCards.propTypes = {
    movieDtls: PropTypes.array,
    head: PropTypes.string,
    subhead: PropTypes.string,
    pagination: PropTypes.bool,
    cardtype: PropTypes.string
}

export default MoviesCards