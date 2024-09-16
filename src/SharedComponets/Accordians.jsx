import PropTypes from "prop-types";
import { Accordion } from "react-bootstrap";
import "./sharedCompoenet.scss";
const Accordions = ({ eventKey, Header, description, onPress }) => {
    return (
        <>
            <Accordion.Item className="mt-3" eventKey={eventKey} onClick={() => { onPress(eventKey) }}>
                <Accordion.Header className="bg-dark text-white">
                    <div className=" me-4 border border-dark rounded-3 d-flex justify-content-center align-items-center text-center" style={{ height: "50px", width: "50px", backgroundColor: "#2c2c2c" }}><p>{eventKey}</p></div>
                    {Header}
                </Accordion.Header>
                <Accordion.Body className="text-white">
                    {description}
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

Accordions.propTypes = {
    eventKey: PropTypes.number,
    Header: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func
};

export default Accordions;