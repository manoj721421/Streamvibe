import FreeBanner from "../assets/freeTrailBanner.png";
import mobFreeTrailImg from "../assets/MobFreeTrailBanner.png";
import {BrowserView, MobileView} from "react-device-detect";
const FreeTrailBanner = () => {
    return (
        <>
            {/* section for normal basic free trail banner */}
            <BrowserView>
                <div className="container my-5 py-4">
                    <div className="image-container">
                        <img src={FreeBanner} width="100%" alt="freeTrailbanner" />
                        <div className="landScreenmask"></div>
                        <div className="d-flex align-items-center position-absolute freeBannerMask">
                            <div className="px-5">
                                <h1 className="text-white" style={{ fontSize: "3em" }}>Start your Free trail Today</h1>
                                <p className="text-white">This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserView>

            <MobileView>
                <div className="position-relative px-3 rounded rounded-3 my-5">
                    <img src={mobFreeTrailImg} width="100%" alt="freeTrailbanner" />
                    <div className="position-absolute text-center h-100 p-5" style={{ top: "0%" }}>
                        <h1 className="text-white">Start you free trail today!</h1>
                        <p className='text-white mt-3'>This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe.</p>
                        <div className="mt-5">
                            <button type="button" className='btn btn-lg py-3 background-red text-white'>Start a Free Trail</button>
                        </div>
                    </div>
                </div>
            </MobileView>
        </>
    )
}

export default FreeTrailBanner;