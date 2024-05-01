import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import slider1 from '../../assets/images/1.jpg'
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide >
                    <div className="w-full md:w-8/12 mx-auto text-center" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slider1})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}>
                        <h4 className='font-bold text-white text-base md:text-xl mb-2'>Experience the Unseen!</h4>
                        <h1 className='text-white text-3xl md:text-6xl xl:text-8xl px-10 xl:px-28 pb-5 md:pb-10  font-bold '>Uncovering Stories, One Trip At A Time</h1>
                        <p></p>
                        <button data-aos="fade-up" data-aos-duration="1600" className='btn border-none text-white  bg-[#d01818] hover:bg-[#0d1637] px-10 text-xl'>Get Start</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;