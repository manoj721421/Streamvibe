import LandingSceeen from "./landingScreen";
import Genres from "../SharedComponets/Genres";
import Devices from "../Helper/JsonStaticData/Devices";
import { FAQsSetA, FAQsSetB } from "../Helper/JsonStaticData/FAQs";
import Accordions from "../SharedComponets/Accordians";
import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { MonthlyPricetier, YearlyPricetier } from "../Helper/JsonStaticData/Pricetiers";
import axios from 'axios';
import { getApiData } from "../Services/indexDb";


import FreeTrailBanner from "../SharedComponets/FreeTrailBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchGenresError, updateGenres } from "../Store/GenresSlices";

const Homepage = () => {
    const dispatch = useDispatch()
    const {data, status, error} = useSelector(state=>state.genres)
    const [defaultKey, setDefaultkey] = useState(0); // here we are setting the default or opened accordian number 
    const [PlanDuration, setPlanDuration] = useState("monthly");
    const [planDetails, setPlanDetails] = useState(MonthlyPricetier)
    const GetActiveAccordian = (activeId) => { setDefaultkey(activeId); }
    const [genres, setData] = useState(null);
    const genresSubhead = "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new";
    console.log(data, status, error)
    useEffect(() => {
        // const fetchData = async () => {
        //     const storedData = await getApiData("genres");
        //     if (storedData) {
        //         setData(storedData);
        //     } else {
        //         try {
        //             dispatch(fetchGenres())
        //             let endpoint = process.env.REACT_APP_API_GENRES_LIST;
        //             endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
        //             let url = `${process.env.REACT_APP_API_BASEURL}${endpoint}`;
        //             await axios.get(url).then((res) => {
        //                 // setData(res?.data);
        //                 dispatch(updateGenres(res.data))
        //             })
        //         }
        //         catch (error) {
        //             console.error('Error fetching data:', error);
        //         }
        //     }
        // }
        // fetchData();
        // let endpoint = process.env.REACT_APP_API_GENRES_LIST;
        // endpoint = endpoint.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1);
        dispatch({
            type:"api/makeApiCall",
            payload:{
                endpoint : process.env.REACT_APP_API_GENRES_LIST.replace('{ApiKey}', process.env.REACT_APP_API_KEY).replace("{pageNumber}", 1),
                onSuccess: updateGenres.type,
                onStart:fetchGenres.type,
                onError:fetchGenresError.type
            }
        })
    }, [])

    return (
        <>
            {/* Not so called dashbaord but Welcome banner */}
            <LandingSceeen />

            {/* Diverse gnerese list section */}
            <Genres genreList={genres} head="Explore our wide variety of categories" subHead={genresSubhead} pagination={true} />

            {/* Streaming Devices List and descriptions */}

            <div className="container my-5 py-5">
                <div className="row align-items-center">
                    <div className=" col-md-9 text-white">
                        <h3>We Provide you streaming experience across various devices.</h3>
                        <small style={{ width: "70%" }}>With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</small>
                    </div>
                    <div className="row mt-5">
                        {
                            Devices.map((item) => {
                                return (
                                    <div className="col-md-4" key={item?.heading}>
                                        <div className="card my-4 border border-dark" style={{ background: "linear-gradient(222deg, rgba(229, 0, 0, 0.50) -208.03%, rgba(229, 0, 0, 0.00) 41.32%), #0F0F0F" }}>
                                            <div className="card-body p-4 text-white">
                                                <div className="d-flex align-items-center">
                                                    <div className=" me-4 border border-dark rounded-3 d-flex justify-content-center align-items-center text-center" style={{ height: "50px", width: "50px", color: "red", backgroundColor: "#141414" }}><i className={item?.icon}></i></div>
                                                    <h5 className="m-0">{item?.heading}</h5>
                                                </div>
                                                <div className="mt-4 px-3">
                                                    <small>{item?.description}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Frequently Asked Questions Section */}

            <div className="container my-5 pb-5">
                <div className="d-flex text-white justify-content-between align-items-center my-5">
                    <div>
                        <h3>Frequently Asked Questions</h3>
                        <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
                    </div>
                    <button className="btn background-red text-white">Ask a Question</button>
                </div>

                <Accordion style={{ backgeoundColor: "#141414 !important" }} defaultActiveKey={defaultKey}>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                FAQsSetA?.map((item, index) => {
                                    return (
                                        <>
                                            <Accordions key={index}
                                                defaultActiveKey={defaultKey}
                                                eventKey={parseInt(item?.id)}
                                                Header={item?.question}
                                                description={item?.description}
                                                onPress={GetActiveAccordian}
                                            />
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-6">
                            {
                                FAQsSetB?.map((item, index) => {
                                    return (
                                        <>
                                            <Accordions key={index}
                                                defaultActiveKey={defaultKey}
                                                eventKey={parseInt(item?.id)}
                                                Header={item?.question}
                                                description={item?.description}
                                                onPress={GetActiveAccordian}
                                            />
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Accordion>
            </div>

            {/* Pricing Tier section - to check the pricing section */}

            <div className="container my-5 py-4">
                <div className="row text-white align-items-center justify-content-between mb-5">
                    <div className="col-12 col-md-6">
                        <h3>Choose the plan that's right for you</h3>
                        <p>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>
                    </div>
                    <div className="col-6 col-md-2">
                        <div className="d-flex justify-content-between background-black rounded rounded-3 align-items-center border border-secondary p-2">
                            <p type="button" className={PlanDuration.toLocaleLowerCase() === "monthly" ? "py-2 px-3 rounded text-white bg-secondary fw-2 me-3" : "text-secondary px-2"} onClick={() => { setPlanDuration("monthly"); setPlanDetails(MonthlyPricetier) }}>Monthly</p>
                            <p type="button" className={PlanDuration.toLocaleLowerCase() === "yearly" ? "py-2 px-4 rounded text-white bg-secondary fw-2" : "text-secondary px-2"} onClick={() => { setPlanDuration("yearly"); setPlanDetails(YearlyPricetier) }}>Yearly</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        planDetails.map((item, index) => {
                            return (
                                <div className="col-md-4 mt-3">
                                    <div className="card p-4 background-dark border border-dark">
                                        <div className="card-body">
                                            <h5 className="card-title text-white">{item.planName}</h5>
                                            <div style={{ height: "10vh" }}>
                                                <small className="text-white">{item?.description}</small>
                                            </div>
                                            <div className="d-flex align-items-center mt-2">
                                                <h4 className="text-white">{item?.price}</h4>
                                                <small className="text-secondary">/{PlanDuration}</small>
                                            </div>
                                            <div className="d-flex mt-4 aling-items-center justify-content-between">
                                                <button className="px-3 btn btn-lg text-white background-black border border-dark rounded">Start Free Trail</button>
                                                <button className="px-3 btn btn-lg text-white background-red rounded">Choose Plan</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

           <FreeTrailBanner/>
        </>
    )
}

export default Homepage;