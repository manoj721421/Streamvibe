import "../Components/component.scss";
import PropTypes from "prop-types";

const Categorycards = ({ genre }) => {
    return (
        <>
            <div className="card background-dark border border-dark">
                <div className="card-body">
                    <div className="poisiton-relative">
                    <img src={genre.image?.[genre?.name]} className="card-img-top p-1" alt={genre.name} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-1">
                        <h6 className="card-title text-white">{genre.name}</h6>
                        <i class="fa-solid fa-arrow-right fa-1x text-white" type="button"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

Categorycards.propTypes = {
    genre: PropTypes.object
}
export default Categorycards;