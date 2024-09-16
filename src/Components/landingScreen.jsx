import wlcmbanner from "../assets/welcomeBanner.png";
import wlcmlogo from "../assets/Abstract Design.png";
import "./component.scss";

const LandingSceeen = () => {
    return (
        <>
            <div className="position-relative" style={{ height: "120vh" }}>
                <div className="image-container">
                    <img className="position-absolute welComeLogo" src={wlcmlogo}  alt="wlcmlogo"></img>
                    <img src={wlcmbanner} alt="welcome banner" className="image" />
                    <div className="landScreenmask">
                    </div>
                </div>
                <div className="text-container text-center text-white">
                    <h1 className="mb-4" style={{ fontSize: "3.3em" }}>The Best Streaming Experience</h1>
                    <p className="" style={{ padding: "0px 19%" }}>StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
                    <div className="mt-5">
                        <button className="btn text-white background-red p-3 px-4"><i class="fa-solid fa-play text-white"></i> Start Watching Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingSceeen;