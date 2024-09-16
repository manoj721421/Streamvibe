import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../SharedComponets/Footer";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Movies from "./Movies";
import Support from "./Support";
import Subscription from "./Subscription";
import { BrowserView, MobileView } from 'react-device-detect';
import MobileNavbar from "./MobileNavbar";
import MovieDetails from "./MovieDetails";
import Error404 from "../SharedComponets/Error404";
import SeriesDetails from "./SeriesDetails";
import MoreMovies from "./MoreMovies";
const Layout = () => {
    const location = useLocation();
    console.log(location);
    return (
        <>
            <BrowserView>
                <Navbar currentRoute ={location?.pathname} />
            </BrowserView>
            <MobileView>
                <MobileNavbar />
            </MobileView>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path="/movies&shows" element={<Movies />} ></Route>
                    <Route path="/support" element={<Support />}></Route>
                    <Route path="/subscription" element={<Subscription />}></Route>
                    <Route path ="/movie/:movieName" element={<MovieDetails/>}></Route>
                    <Route path ="/series/:seriesName" element={<SeriesDetails/>}></Route>
                    <Route path ="/movies/:movieType" element = {<MoreMovies/>}></Route>
                    <Route path="*" element={<Error404/>}></Route>
                </Routes>
            </div>
            {/* Basic Footer section of the website */}
            <Footer />
        </>
    )
}

export default Layout;