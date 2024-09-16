// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
//My custom syle
import "./sharedCompoenet.scss";
import PropTypes from "prop-types";
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const SwiperComponent = ({ nowplaying }) => {
  console.log(nowplaying)
  const [nowPlayingList, setNowPlayingList] = useState([])

  useEffect(()=>{
    setNowPlayingList(nowplaying)
  },[nowplaying])
  
  return (
  <>
    {
      nowPlayingList.length > 0 &&
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true} 
      modules={[Pagination, Navigation]}
      className="mySwiper">
      {
        nowPlayingList?.map((movie) => {
          return (
            <>
              <SwiperSlide key={movie.id} className="swiper-slide" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <Row className='justify-content-center align-items-end' style={{ height: "80vh" }}>
                  <Col md={6} sm={8}>
                    <div className='mask'></div>
                    <div className="mb-3">
                      {
                        movie?.logo !== null ?
                          <img src={`https://image.tmdb.org/t/p/original${movie?.logo}`} width="250px" alt={movie?.title} className='img-fluid' /> :
                          <h1 className='text-white'>{movie?.title}</h1>
                      }
                    </div>
                    <small className='text-white'>{movie?.overview}</small>
                    <div className='d-flex justify-content-center mt-3'>
                      <button className='btn background-red text-white mx-2'><i class="fa-solid fa-play text-white"></i> Play Now</button>
                      <button className='btn btn-dark  border border-dark mx-1 text-white'><i class="fa-solid fa-plus"></i></button>
                      <button className='btn btn-dark border border-dark mx-1 text-white'><i class="fa-solid fa-thumbs-up"></i></button>
                      <button className='btn btn-dark border border-dark mx-1 text-white'><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                  </Col>
                </Row>
              </SwiperSlide>
            </>
          )
        })
      }
    </Swiper>
    }
  </>
  );
};

SwiperComponent.propTypes = {
  nowplaying: PropTypes.array
}

export default SwiperComponent;