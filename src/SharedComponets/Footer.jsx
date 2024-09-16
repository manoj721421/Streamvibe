import "../Components/component.scss";
const Footer = () => {
    return (
        <div className="w-100 p-5" style={{ backgroundColor: "black" }}>
            <div className="container">
            <div className="row">
                <div className="col-md-2 text-center text-secondary">
                    <ul>
                        <li className="text-white">Home</li>
                        <li>Categories</li>
                        <li>Devices</li>
                        <li>pricing</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div className="col-md-2 text-center text-secondary">
                    <ul>
                        <li className="text-white">Movies</li>
                        <li>Genres</li>
                        <li>Trending</li>
                        <li>New Release</li>
                        <li>Popular</li>
                    </ul>
                </div>
                <div className="col-md-2 text-center text-secondary">
                    <ul>
                        <li className="text-white">Shows</li>
                        <li>Genres</li>
                        <li>Trending</li>
                        <li>New Release</li>
                        <li>Popular</li>
                    </ul>
                </div>
                <div className="col-md-2 text-center text-secondary">
                    <ul>
                        <li className="text-white">Support</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="col-md-2 text-center text-secondary">
                    <ul>
                        <li className="text-white">Subscription</li>
                        <li>Plans</li>
                        <li>Features</li>
                    </ul>
                </div>
                <div className="col-md-2 text-center">
                    <p className="text-white">Connect With Us</p>
                    <div className="d-flex justify-content-center mt-3">
                        <div className="border border-dark rounded-3 d-flex justify-content-center align-items-center text-center text-white" style={{ height: "50px", width: "50px", backgroundColor: "#343434" }}><i className="fa-brands fa-facebook"></i></div>
                        <div className=" mx-2 border border-dark rounded-3 d-flex justify-content-center align-items-center text-center text-white" style={{ height: "50px", width: "50px", backgroundColor: "#343434" }}><i className="fa-brands fa-twitter"></i></div>
                        <div className="border border-dark rounded-3 d-flex justify-content-center align-items-center text-center text-white" style={{ height: "50px", width: "50px", backgroundColor: "#343434" }}><i className="fa-brands fa-linkedin"></i></div>
                    </div>
                </div>
            </div> 
            <div className="text-secondary">
                <hr/>
                <div className="mt-4 d-flex justify-content-between">
                <div>@2023 streamvibe, All Rights Reserved</div>
                <div className="d-flex">
                    <div className="px-2"><p>Terms of use</p></div>
                    <div className="px-2"><p>Privacy Policy</p></div>
                    <div className="px-2"><p>Cookie Policy</p></div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer;