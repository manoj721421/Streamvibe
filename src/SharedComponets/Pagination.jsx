import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const Pagination = ({ currentPage, totalPages,pageType, onPageChange }) => {
    const navigate = useNavigate()
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <>
            <div>
                <div className="d-flex border border-dark background-black rounded-3 p-3">
                    <div className="rounded border background-dark border-dark px-3 py-2" type="button" onClick={handlePrevious}><i class="fa-solid fa-arrow-left fa-1x"></i></div>
                    <ul className="m-0 p-0 d-flex align-items-center mx-2" style={{ listStyle: "none" }}>
                        {[...Array(totalPages)]?.map((_, index) => (
                            <li key={index} style={{ margin: "1px 2px" }}>
                                <div
                                    className="rounded-5"
                                    style={{
                                        height: "5px",
                                        width: currentPage === index + 1 ? "25px" : "15px",
                                        backgroundColor: currentPage === index + 1 ? "red" : "grey"
                                    }}
                                ></div>
                            </li>
                        ))}
                    </ul>
                    {
                        totalPages === currentPage ?
                            <div type="button" className="rounded border background-dark border-dark px-3 py-2" onClick={()=>{navigate(`/movies/${pageType}`)}}><p>More</p></div> :
                            <>
                                <div className="rounded border background-dark border-dark px-3 py-2" type="button" onClick={handleNext}><i class="fa-solid fa-arrow-right"></i></div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    pageType:PropTypes.string,
    onPageChange: PropTypes.func
}

export default Pagination;