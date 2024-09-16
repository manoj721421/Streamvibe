import PropTypes from "prop-types";
import { Accordion } from "react-bootstrap";
import "./sharedCompoenet.scss";
import NoImage from "../assets/no-image.png";
import { useState } from "react";
const SeriesAccordians = ({ eventKey, Header, subHeader, episodes, onPress, setEpisodes }) => {
    const [spinner, setSpinner] = useState(false);
    return (
        <>
            <Accordion.Item className="mt-3" eventKey={eventKey} onClick={() => { setSpinner(!spinner); setEpisodes([]); onPress(eventKey); }}>
                <Accordion.Header className="bg-dark text-white">
                    {/* <div className=" me-4 border border-dark rounded-3 d-flex justify-content-center align-items-center text-center" style={{ height: "50px", width: "50px", backgroundColor: "#2c2c2c" }}><p>{eventKey}</p></div> */}
                    {Header}&nbsp;&nbsp;<small className="text-secondary">{subHeader} Episodes</small>
                </Accordion.Header>
                <Accordion.Body className="text-white">
                    <div>
                        {
                            spinner && episodes.length === 0 ?
                                <>
                                    <div className="w-100 text-center">
                                        <i class="fa-solid fa-circle-notch text-white fa-spin"></i>
                                    </div>
                                </> :
                                episodes.map((episode, index) => {
                                    return (
                                        
                                        <div className="row justify-content-evenly align-items-center my-3" key={index}>

                                            <div className="col-3">
                                                <img src={episode?.still_path === null ? NoImage : `https://image.tmdb.org/t/p/original${episode?.still_path}`} width="185px" height="120px" className="rounded" alt="still_path" />
                                            </div>
                                            <div className="col-9">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <p className="fw-bold ">{episode?.name?.slice(0, 70)}</p>
                                                    <div className="p-1 rounded border"><i class="fa-solid fa-clock"></i>&nbsp;{episode?.runtime}min</div>
                                                </div>
                                                <small>{episode?.overview?.slice(0, 300)}...</small>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

SeriesAccordians.propTypes = {
    eventKey: PropTypes.number,
    Header: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func
};

export default SeriesAccordians;
