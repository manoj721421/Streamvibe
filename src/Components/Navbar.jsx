/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import logo from "../assets/Logo.png";
import "./component.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

const Navbar = ({ currentRoute }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(currentRoute);
    const [show, setShow] = useState(false);
    const [SearchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => { setSearchResult([]); setShow(true) };

    const FetchSearchResult = async () => {
        let endpoint = process.env.REACT_APP_API_SEARCH;
        endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{query}", SearchValue);
        let url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`;
        const response = await axios.get(url);
        setSearchResult(response.data.results);
    }

    const moveToDetails=(id,movieType)=>{
        movieType === "movie"?
        navigate(`/movie/${id}`) :
        navigate(`/series/${id}`)
    }
    return (
        <>
            <div className="container">
                <nav class="navbar navbar-expand-lg navbar-dark position-sticky" style={{ backgroundColor: "transparent", top: "0px", zIndex: "999" }} >
                    <div class="d-flex  align-items-center justify-content-between" style={{ backgroundColor: "transparent", width: "100vw" }}>
                        <Link to="/" class="navbar-brand transparent" href="#">
                            <img src={logo} width="160px" alt="Logo" />
                        </Link>

                        <div class="me-5" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto  mb-2 mb-lg-0 border border-dark border-4 rounded-4" style={{ backgroundColor: "#0F0F0F" }}>
                                <li class="nav-item px-2">
                                    <Link class={active === "/" ? "nav-link bg-secondary border border-dark rounded" : "nav-link"} aria-current="page" href="#"
                                        to="/" onClick={() => { setActive("/") }}>Home</Link>
                                </li>
                                <li class="nav-item px-2">
                                    <Link class={active === "/movies&shows" ? "nav-link bg-secondary border border-dark rounded" : "nav-link"} href="#"
                                        to="/movies&shows" onClick={() => { setActive("/movies&shows") }}>Movies & TV</Link>
                                </li>
                                <li class="nav-item px-2">
                                    <Link class={active === "/support" ? "nav-link bg-secondary border border-dark rounded" : "nav-link"} href="#"
                                        to="/support" onClick={() => { setActive("/support") }}>Support</Link>
                                </li>
                                <li class="nav-item px-2">
                                    <Link class={active === "/subscription" ? "nav-link bg-secondary border border-dark rounded" : "nav-link"} href="#"
                                        to="/subscription" onClick={() => { setActive("/subscription") }}>Subscription</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex">
                            <div className="mx-3" type="button" onClick={handleShow}>
                                <i class="fa-solid fa-magnifying-glass fa-2x text-white"></i>
                            </div>
                            <div className="mx-2" type="button">
                                <i class="fa-regular fa-bell fa-2x text-white"></i>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <Modal  size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header className="bg-dark text-white" closeButton>
                    <Modal.Title className="text-white">Search Movies, shows</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark ">
                    <div className="d-flex">
                        <input type="text" className="form-control" onChange={(e) => { setSearchValue(e.target.value) }} placeholder="Search Movies, shows" />
                        <Button variant="success" className="mx-3" onClick={() => { FetchSearchResult() }}>
                            <i class="fa-solid fa-magnifying-glass text-white"></i>
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Row>
                            {
                                searchResult?.map((item, index) => {
                                    return (
                                        <>
                                            {
                                                item?.poster_path &&
                                                <Col className='mb-3' md={3} sm={6} xs={9}>
                                                    <Card key={index} className='background-dark ' style={{ width: '16rem', borderRadius: "1em" }} onClick={() => { handleClose();moveToDetails(item?.id,item?.media_type) }}>
                                                        <Card.Img className='p-2' variant="top" src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} style={{ borderRadius: "1em" }} />
                                                        <Card.Body>
                                                            {
                                                                <div className='d-flex justify-content-between text-white align-items-center'>
                                                                    <Card.Text className='' style={{ width: "50%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>
                                                                        <small>#{item?.id}<br /></small>
                                                                        {item?.title ? item?.title : item?.name}
                                                                    </Card.Text>
                                                                    <Card.Text className='text-center' style={{ textWrap: "nowrap" }}><i class="fa-solid fa-heart color-red"></i> {item?.vote_average}</Card.Text>
                                                                </div>
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            }
                                        </>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>


        </>

    )
}

export default Navbar;