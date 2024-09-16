import Pagination from "./Pagination";
import Categorycards from "./Categorycards";
import GenresList from "../Helper/JsonStaticData/Genres";
import PropTypes from "prop-types";
import { useState } from "react";

const Genres = ({ genreList, head, subHead, pagination }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const genresPerPage = 5;
    const totalPages = Math.ceil(GenresList.length / genresPerPage);

    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = GenresList.slice(indexOfFirstGenre, indexOfLastGenre);
    return (
        <>
            <div className="container mt-5 pt-3">
                <div className="d-flex text-white justify-content-between">
                    <div>
                        <h2>{head}</h2>
                        <p style={{ fontSize: "0.8em" }}>{subHead}</p>
                    </div>
                    {
                        pagination &&
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    }
                </div>
                <div className="d-flex mt-5 genresCard" style={{}}>
                    {
                        currentGenres?.map((item) => {
                            return (
                                <div key={item?.name} className="">
                                    <Categorycards genre={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

Genres.propTypes = {
    genreList: PropTypes.object,
    head: PropTypes.string,
    subHead: PropTypes.string,
    pagination: PropTypes.bool
}

export default Genres;